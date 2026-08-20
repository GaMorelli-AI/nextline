import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-brand text-onbrand font-semibold hover:brightness-110 shadow-[0_4px_16px_-4px_rgba(52,224,161,0.45)]",
  secondary: "bg-ink/[0.06] text-slate-100 border border-ink/10 hover:bg-ink/[0.1]",
  ghost: "text-slate-300 hover:bg-ink/[0.06] hover:text-slate-50",
  outline: "border border-ink/15 text-slate-200 hover:border-emerald-400/40 hover:text-emerald-300",
  danger: "bg-[var(--color-status-critical-bg)] text-[var(--color-status-critical)] border border-[var(--color-status-critical)]/25 hover:bg-[var(--color-status-critical)]/20",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-[15px] gap-2",
  icon: "h-9 w-9 justify-center",
};

export function Button({
  children,
  variant = "secondary",
  size = "md",
  className,
  icon,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] transition-all duration-150 ring-brand-focus disabled:opacity-40 disabled:pointer-events-none select-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
