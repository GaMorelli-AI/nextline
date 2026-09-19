import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  }[size];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-fade-in-up"
        onClick={onClose}
      />
      <div
        className={cn(
          "surface-panel relative z-10 w-full rounded-[var(--radius-xl)] shadow-[var(--shadow-elevated)] animate-fade-in-up max-h-[88vh] flex flex-col",
          sizeClasses
        )}
      >
        <div className="flex items-center justify-between border-b border-ink/[0.07] px-6 py-4">
          <h2 className="text-[16px] font-semibold text-slate-50">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-xs)] text-slate-400 hover:bg-ink/[0.06] hover:text-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-thin px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-ink/[0.07] px-6 py-4">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
