import { cn } from "@/lib/utils";

function normalize(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
}

export function Progress({ className, value = 0, ...props }) {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-slate-200", className)} {...props}>
      <div className="h-full bg-slate-900 transition-all duration-300" style={{ width: `${normalize(value)}%` }} />
    </div>
  );
}