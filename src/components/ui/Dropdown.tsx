import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Dropdown({
  trigger,
  children,
  align = "left",
  className,
}: {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 min-w-[200px] rounded-[var(--radius-md)] border border-ink/10 py-1.5 shadow-[var(--shadow-elevated)] animate-fade-in-up",
            align === "right" ? "right-0" : "left-0",
            className
          )}
          style={{ background: "var(--color-navy-700)" }}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  icon,
  danger = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[13.5px] transition-colors hover:bg-ink/[0.06]",
        danger ? "text-[var(--color-status-critical)]" : "text-slate-200"
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="my-1.5 h-px bg-ink/[0.07]" />;
}
