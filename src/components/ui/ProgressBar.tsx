import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  tone = "brand",
  size = "md",
  className,
  showLabel = false,
}: {
  value: number;
  tone?: "brand" | "ok" | "warn" | "critical";
  size?: "sm" | "md";
  className?: string;
  showLabel?: boolean;
}) {
  const toneClass =
    tone === "brand"
      ? "bg-gradient-brand"
      : tone === "ok"
      ? "bg-[var(--color-status-ok)]"
      : tone === "warn"
      ? "bg-[var(--color-status-warn)]"
      : "bg-[var(--color-status-critical)]";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-1 rounded-full bg-ink/[0.07] overflow-hidden", size === "sm" ? "h-1.5" : "h-2")}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", toneClass)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && <span className="text-[12px] tabular-nums text-slate-400 w-8 text-right">{value}%</span>}
    </div>
  );
}
