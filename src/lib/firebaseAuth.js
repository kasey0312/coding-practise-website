import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AUTH_TTL_MS = 24 * 60 * 60 * 1000;
const AUTH_LOGIN_AT_KEY = "python-practice-auth-login-at-v1";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let appInstance;
let authInstance;
let persistencePromise;

function hasWindow() {
  return typeof window !== "undefined";
}

function readLoginTimestamp() {
  if (!hasWindow()) return null;
  const rawValue = window.localStorage.getItem(AUTH_LOGIN_AT_KEY);
  const value = Number(rawValue);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function writeLoginTimestamp(timestamp = Date.now()) {
  if (!hasWindow()) return;
  window.localStorage.setItem(AUTH_LOGIN_AT_KEY, String(timestamp));
}

function clearLoginTimestamp() {
  if (!hasWindow()) return;
  window.localStorage.removeItem(AUTH_LOGIN_AT_KEY);
}

function getMissingConfigKeys() {
  return Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);
}

function getFirebaseAuth() {
  if (authInstance) return authInstance;

  const missingKeys = getMissingConfigKeys();
  if (missingKeys.length > 0) {
    throw new Error(
      `Missing Firebase config: ${missingKeys.join(", ")}. Add VITE_FIREBASE_* values in your .env file.`
    );
  }

  if (!appInstance) {
    appInstance = initializeApp(firebaseConfig);
  }
  authInstance = getAuth(appInstance);
  return authInstance;
}

function ensurePersistence(auth) {
  if (!persistencePromise) {
    persistencePromise = setPersistence(auth, browserLocalPersistence);
  }
  return persistencePromise;
}

function ttlExpiryTimestamp() {
  const loginAt = readLoginTimestamp();
  return loginAt ? loginAt + AUTH_TTL_MS : null;
}

function isTtlExpired() {
  const expiresAt = ttlExpiryTimestamp();
  if (!expiresAt) return false;
  return Date.now() >= expiresAt;
}

function prettyFirebaseError(error) {
  const code = error?.code || "";
  const map = {
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "No account exists for this email.",
    "auth/wrong-password": "Invalid email or password.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection and retry.",
  };
  return map[code] || error?.message || "Authentication failed. Please try again.";
}

async function buildSessionFromUser(user) {
  const token = await user.getIdToken();
  const tokenResult = await user.getIdTokenResult();
  const tokenExpiry = tokenResult?.expirationTime
    ? new Date(tokenResult.expirationTime).getTime()
    : Date.now() + AUTH_TTL_MS;
  const ttlExpiry = ttlExpiryTimestamp() ?? Date.now() + AUTH_TTL_MS;

  return {
    token,
    user: {
      email: user.email || "",
      name: user.displayName || "",
      uid: user.uid,
    },
    expiresAt: Math.min(tokenExpiry, ttlExpiry),
  };
}

export function useAuthSession() {
  const [status, setStatus] = useState("loading");
  const [session, setSession] = useState(null);
  const [configError, setConfigError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let unsubscribe = () => {};

    async function bootstrap() {
      try {
        const auth = getFirebaseAuth();
        await ensurePersistence(auth);

        unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            if (!cancelled) {
              setSession(null);
              setStatus("anonymous");
            }
            clearLoginTimestamp();
            return;
          }

          if (isTtlExpired()) {
            await signOut(auth);
            clearLoginTimestamp();
            if (!cancelled) {
              setSession(null);
              setStatus("anonymous");
            }
            return;
          }

          const nextSession = await buildSessionFromUser(user);
          if (!cancelled) {
            setSession(nextSession);
            setStatus("authenticated");
          }
        });
      } catch (error) {
        if (!cancelled) {
          setConfigError(error?.message || "Firebase is not configured.");
          setStatus("error");
        }
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.expiresAt) return;
    const msLeft = session.expiresAt - Date.now();
    if (msLeft <= 0) return;
    const timer = window.setTimeout(async () => {
      try {
        const auth = getFirebaseAuth();
        await signOut(auth);
      } catch {
        // Ignore signOut failures at timeout and clear local state anyway.
      }
      clearLoginTimestamp();
      setSession(null);
      setStatus("anonymous");
    }, msLeft);

    return () => window.clearTimeout(timer);
  }, [session?.expiresAt]);

  const login = async ({ email, password, mode = "signin" }) => {
    const auth = getFirebaseAuth();
    await ensurePersistence(auth);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const credential =
        mode === "signup"
          ? await createUserWithEmailAndPassword(auth, normalizedEmail, password)
          : await signInWithEmailAndPassword(auth, normalizedEmail, password);

      writeLoginTimestamp();
      const nextSession = await buildSessionFromUser(credential.user);
      setSession(nextSession);
      setStatus("authenticated");
      return nextSession;
    } catch (error) {
      throw new Error(prettyFirebaseError(error));
    }
  };

  const logout = async () => {
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } finally {
      clearLoginTimestamp();
      setSession(null);
      setStatus("anonymous");
    }
  };

  return {
    status,
    isAuthenticated: status === "authenticated",
    token: session?.token || null,
    user: session?.user || null,
    expiresAt: session?.expiresAt || null,
    configError,
    login,
    logout,
  };
}
