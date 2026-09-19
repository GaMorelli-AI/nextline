import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  width?: "sm" | "md" | "lg";
}) {
  if (!open) return null;

  const widthClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
  }[width];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={cn(
          "surface-panel relative z-10 h-full w-full overflow-y-auto scrollbar-thin shadow-[var(--shadow-elevated)]",
          widthClasses
        )}
        style={{ animation: "slide-in-right 0.24s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <style>{`@keyframes slide-in-right { from { transform: translateX(24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-ink/[0.07] bg-navy-850/95 px-6 py-5 backdrop-blur">
          <div>
            <h2 className="text-[16px] font-semibold text-slate-50">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[13px] text-slate-400">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-xs)] text-slate-400 hover:bg-ink/[0.06] hover:text-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
