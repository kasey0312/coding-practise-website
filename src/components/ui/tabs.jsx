import React from "react";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext(null);

export function Tabs({ defaultValue, value, onValueChange, className, children, ...props }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeValue = value !== undefined ? value : internalValue;

  const setValue = React.useCallback(
    (nextValue) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      if (onValueChange) {
        onValueChange(nextValue);
      }
    },
    [onValueChange, value]
  );

  return (
    <TabsContext.Provider value={{ activeValue, setValue }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }) {
  return <div role="tablist" className={cn("inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1", className)} {...props} />;
}

export function TabsTrigger({ className, value, onClick, ...props }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;

  const isActive = ctx.activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={(event) => {
        ctx.setValue(value);
        if (onClick) onClick(event);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, value, ...props }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx || ctx.activeValue !== value) return null;

  return <div role="tabpanel" className={cn("mt-2", className)} {...props} />;
}