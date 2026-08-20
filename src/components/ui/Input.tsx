import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  icon,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode }) {
  return (
    <div className="relative flex items-center">
      {icon && <span className="pointer-events-none absolute left-3 text-slate-500">{icon}</span>}
      <input
        className={cn(
          "h-9 w-full rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.04] text-[13.5px] text-slate-100 placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-400/40 focus:bg-ink/[0.06] ring-brand-focus",
          icon ? "pl-9 pr-3" : "px-3",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-9 rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.04] px-3 text-[13.5px] text-slate-100 outline-none transition-colors focus:border-emerald-400/40 ring-brand-focus appearance-none cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.04] px-3 py-2.5 text-[13.5px] text-slate-100 placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-400/40 focus:bg-ink/[0.06] ring-brand-focus resize-none",
        className
      )}
      {...props}
    />
  );
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <label className={cn("mb-1.5 block text-[12.5px] font-medium text-slate-400", className)}>{children}</label>;
}
