import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  breadcrumb,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
        {eyebrow && (
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-emerald-400">{eyebrow}</p>
        )}
        <h1 className="text-[22px] font-semibold tracking-tight text-slate-50 md:text-[26px]">{title}</h1>
        {subtitle && <p className="mt-1.5 text-[13.5px] text-slate-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
