import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-slate-900 text-white hover:bg-slate-800",
  outline: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100",
};

export function Button({ className, variant = "default", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant] || buttonVariants.default,
        className
      )}
      {...props}
    />
  );
}