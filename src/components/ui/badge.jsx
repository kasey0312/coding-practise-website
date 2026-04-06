import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-slate-900 text-white",
  secondary: "border border-slate-200 bg-slate-100 text-slate-700",
};

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    />
  );
}