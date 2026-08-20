import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
  trend,
  trendLabel,
  icon,
  tone = "default",
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  icon?: ReactNode;
  tone?: "default" | "brand" | "warn" | "critical";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-card surface-card-hover rounded-[var(--radius-lg)] p-5 relative overflow-hidden",
        className
      )}
    >
      {tone === "brand" && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-brand" />
      )}
      <div className="flex items-start justify-between">
        <p className="text-[12.5px] font-medium text-slate-400 tracking-wide">{label}</p>
        {icon && (
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)]",
              tone === "brand" && "bg-gradient-brand-soft text-emerald-300",
              tone === "warn" && "bg-[var(--color-status-warn-bg)] text-[var(--color-status-warn)]",
              tone === "critical" && "bg-[var(--color-status-critical-bg)] text-[var(--color-status-critical)]",
              tone === "default" && "bg-ink/[0.05] text-slate-400"
            )}
          >
            {icon}
          </div>
        )}
      </div>
      <p className="mt-3 text-[26px] font-semibold leading-none text-slate-50 tabular-nums">{value}</p>
      {(hint || trend) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-[12.5px]">
          {trend && trend !== "neutral" && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium",
                trend === "up" ? "text-[var(--color-status-ok)]" : "text-[var(--color-status-critical)]"
              )}
            >
              {trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {trendLabel}
            </span>
          )}
          {hint && <span className="text-slate-500">{hint}</span>}
        </div>
      )}
    </div>
  );
}
