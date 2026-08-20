import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink/[0.05] text-slate-500">
          {icon}
        </div>
      )}
      <div>
        <p className="text-[14.5px] font-medium text-slate-200">{title}</p>
        {description && <p className="mt-1 max-w-sm text-[13px] text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
