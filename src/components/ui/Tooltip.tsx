import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tooltip({
  children,
  content,
  side = "top",
}: {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}) {
  const [open, setOpen] = useState(false);

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[side];

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 whitespace-nowrap rounded-[var(--radius-xs)] border border-ink/10 px-2.5 py-1.5 text-[11.5px] font-medium text-slate-100 shadow-[var(--shadow-elevated)] animate-fade-in-up",
            sideClasses
          )}
          style={{ background: "var(--color-navy-600)" }}
        >
          {content}
        </span>
      )}
    </span>
  );
}
