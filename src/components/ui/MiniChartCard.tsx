import type { ReactNode } from "react";
import { Clock } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const headerGradients = {
  emerald: "from-emerald-500 to-teal-600",
  teal: "from-teal-500 to-cyan-600",
  cyan: "from-cyan-500 to-emerald-600",
} as const;

export function MiniChartCard({
  title,
  subtitle,
  data,
  dataKey,
  icon,
  tone = "emerald",
  footer,
  className,
}: {
  title: string;
  subtitle: ReactNode;
  data: Record<string, number | string>[];
  dataKey: string;
  icon?: ReactNode;
  tone?: keyof typeof headerGradients;
  footer: string;
  className?: string;
}) {
  return (
    <div className={cn("surface-card surface-card-hover overflow-hidden rounded-[var(--radius-xl)] p-0", className)}>
      <div className={cn("h-[140px] bg-gradient-to-br px-2 pt-3", headerGradients[tone])}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id={`mini-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#ffffff"
              strokeWidth={2}
              fill={`url(#mini-${title})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-[15px] font-semibold text-slate-50">{title}</p>
        </div>
        <p className="mt-1 text-[12.5px] text-slate-500">{subtitle}</p>
        <div className="mt-3.5 flex items-center gap-1.5 border-t border-ink/[0.07] pt-3 text-[11.5px] text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          {footer}
        </div>
      </div>
    </div>
  );
}
