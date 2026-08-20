import { cn } from "@/lib/utils";

const palette = [
  "from-emerald-400 to-teal-500",
  "from-teal-400 to-cyan-500",
  "from-cyan-400 to-emerald-500",
  "from-emerald-500 to-cyan-400",
];

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-7 w-7 text-[11px]",
    md: "h-9 w-9 text-[13px]",
    lg: "h-12 w-12 text-[16px]",
  }[size];

  const gradient = palette[hashString(initials) % palette.length];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-onbrand",
        gradient,
        sizeClasses,
        className
      )}
    >
      {initials}
    </div>
  );
}
