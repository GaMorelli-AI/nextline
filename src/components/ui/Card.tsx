import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hoverable = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; hoverable?: boolean }) {
  return (
    <div
      className={cn(
        "surface-card rounded-[var(--radius-lg)]",
        hoverable && "surface-card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-5 pt-5", className)}>
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold text-slate-50">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[13px] text-slate-400">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>;
}
