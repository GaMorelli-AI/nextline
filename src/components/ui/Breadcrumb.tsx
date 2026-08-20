import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-600" />}
          {item.href ? (
            <Link to={item.href} className="hover:text-slate-300 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-300">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
