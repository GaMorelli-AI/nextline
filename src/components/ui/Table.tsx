import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="overflow-x-auto scrollbar-thin rounded-[var(--radius-lg)] border border-ink/[0.07]">
      <table className={cn("w-full border-collapse text-left text-[13.5px]", className)}>{children}</table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return <thead className="bg-ink/[0.03]">{children}</thead>;
}

export function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-4 py-3 text-[11.5px] font-semibold uppercase tracking-wider text-slate-500",
        className
      )}
    >
      {children}
    </th>
  );
}

export function Tbody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-ink/[0.06]">{children}</tbody>;
}

export function Tr({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={cn("transition-colors", onClick && "cursor-pointer hover:bg-ink/[0.03]", className)}
    >
      {children}
    </tr>
  );
}

export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("px-4 py-3.5 text-slate-300", className)}>{children}</td>;
}
