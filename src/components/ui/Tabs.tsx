import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { key: string; label: string; icon?: ReactNode; count?: number }[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 overflow-x-auto scrollbar-thin border-b border-ink/[0.07]", className)}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={cn(
              "relative flex items-center gap-1.5 whitespace-nowrap px-3.5 py-3 text-[13.5px] font-medium transition-colors",
              isActive ? "text-slate-50" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10.5px] leading-none",
                  isActive ? "bg-gradient-brand-soft text-emerald-300" : "bg-ink/[0.06] text-slate-400"
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-brand rounded-full" />}
          </button>
        );
      })}
    </div>
  );
}

export function SegmentedControl({
  options,
  active,
  onChange,
  className,
}: {
  options: { key: string; label: ReactNode }[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center rounded-[var(--radius-sm)] bg-ink/[0.05] p-1", className)}>
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={cn(
            "rounded-[6px] px-3 py-1.5 text-[13px] font-medium transition-all",
            active === opt.key ? "bg-navy-600 text-slate-50 shadow-sm" : "text-slate-400 hover:text-slate-200"
          )}
          style={active === opt.key ? { background: "var(--color-navy-600)" } : undefined}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
