import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const iconGradients = {
  emerald: "from-emerald-400 to-teal-500",
  teal: "from-teal-400 to-cyan-500",
  cyan: "from-cyan-400 to-emerald-400",
  warn: "from-[#f0b23e] to-[#f0553e]",
} as const;

export function KpiCard({
  icon,
  label,
  value,
  trend,
  trendValue,
  trendLabel,
  iconTone = "emerald",
  className,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
  trendLabel: string;
  iconTone?: keyof typeof iconGradients;
  className?: string;
}) {
  return (
    <div className={cn("surface-card surface-card-hover relative rounded-[var(--radius-xl)] pt-0 pb-4", className)}>
      <div className="flex items-start justify-between px-5 pt-5">
        <div
          className={cn(
            "-mt-9 flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br text-onbrand shadow-[0_6px_16px_-4px_rgba(0,0,0,0.35)]",
            iconGradients[iconTone]
          )}
        >
          {icon}
        </div>
        <div className="text-right">
          <p className="text-[12px] font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-[24px] font-semibold leading-none text-slate-50 tabular-nums">{value}</p>
        </div>
      </div>
      <div className="mx-5 mt-4 border-t border-ink/[0.07] pt-3">
        <p className="flex items-center gap-1 text-[12.5px] text-slate-500">
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-semibold",
                trend === "up" ? "text-[var(--color-status-ok)]" : "text-[var(--color-status-critical)]"
              )}
            >
              {trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {trendValue}
            </span>
          )}
          {trendLabel}
        </p>
      </div>
    </div>
  );
}
