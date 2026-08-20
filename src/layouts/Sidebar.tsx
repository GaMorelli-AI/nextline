import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  HardHat,
  Landmark,
  Boxes,
  Wrench,
  FileText,
  FileSignature,
  Users,
  Box,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNextAI } from "@/context/NextAIContext";

const mainNav = [
  { to: "/", label: "Visão Geral", icon: LayoutGrid, end: true },
  { to: "/obras", label: "Obras", icon: HardHat },
  { to: "/patrimonio", label: "Patrimônio", icon: Landmark },
  { to: "/ativos", label: "Ativos", icon: Boxes },
  { to: "/facilities", label: "Facilities", icon: Wrench },
  { to: "/documentos", label: "Documentos", icon: FileText },
  { to: "/contratos", label: "Contratos", icon: FileSignature },
  { to: "/fornecedores", label: "Fornecedores", icon: Users },
  { to: "/bim", label: "BIM", icon: Box },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

const adminNav = [
  { to: "/administracao", label: "Administração", icon: ShieldCheck },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
];

export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen = false,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const { openPanel } = useNextAI();

  return (
    <aside
      className={cn(
        "surface-panel fixed inset-y-0 left-0 z-[95] flex h-screen w-[248px] shrink-0 flex-col border-r border-ink/[0.06] transition-transform duration-200",
        "md:sticky md:top-0 md:translate-x-0",
        collapsed ? "md:w-[76px]" : "md:w-[248px]",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className={cn("flex h-16 items-center justify-between border-b border-ink/[0.06] px-5", collapsed && "md:justify-center md:px-0")}>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-onbrand">
            <svg viewBox="0 0 32 32" className="h-5 w-5">
              <path d="M8 7 L15 16 L8 25 L12.5 25 L19.5 16 L12.5 7 Z" fill="#e6eaf1" />
              <path d="M16 7 L23 16 L16 25 L20.5 25 L27.5 16 L20.5 7 Z" fill="url(#sidebar-grad)" />
              <defs>
                <linearGradient id="sidebar-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34e0a1" />
                  <stop offset="55%" stopColor="#2dd4c8" />
                  <stop offset="100%" stopColor="#34c9e8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={cn("text-[15px] font-semibold tracking-tight text-slate-50", collapsed && "md:hidden")}>
            NEXT<span className="text-gradient-brand">LINE</span>
          </span>
        </div>
        <button
          onClick={onCloseMobile}
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-xs)] text-slate-400 hover:bg-ink/[0.06] md:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        <ul className="space-y-0.5">
          {mainNav.map((item) => (
            <NavItem key={item.to} {...item} collapsed={collapsed} onNavigate={onCloseMobile} />
          ))}
        </ul>

        <div className="my-3 h-px bg-ink/[0.07]" />

        <button
          onClick={openPanel}
          className={cn(
            "group flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-[13.5px] font-medium text-slate-300 transition-colors hover:bg-ink/[0.05]",
            collapsed && "md:justify-center md:px-0"
          )}
        >
          <Sparkles className="h-[18px] w-[18px] shrink-0 text-emerald-400" />
          <span className={cn("text-gradient-brand font-semibold", collapsed && "md:hidden")}>Next AI</span>
        </button>

        <div className="my-3 h-px bg-ink/[0.07]" />

        <ul className="space-y-0.5">
          {adminNav.map((item) => (
            <NavItem key={item.to} {...item} collapsed={collapsed} onNavigate={onCloseMobile} />
          ))}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-ink/[0.06] p-3">
        <button
          onClick={onToggle}
          className={cn(
            "hidden w-full items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-[12.5px] font-medium text-slate-500 transition-colors hover:bg-ink/[0.05] hover:text-slate-300 md:flex",
            collapsed && "md:justify-center md:px-0"
          )}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          <span className={cn(collapsed && "md:hidden")}>Recolher</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  end,
  collapsed,
  onNavigate,
}: {
  to: string;
  label: string;
  icon: typeof LayoutGrid;
  end?: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        onClick={onNavigate}
        className={({ isActive }) =>
          cn(
            "group relative flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-[13.5px] font-medium transition-colors",
            collapsed && "md:justify-center md:px-0",
            isActive
              ? "bg-gradient-brand-soft text-slate-50"
              : "text-slate-400 hover:bg-ink/[0.05] hover:text-slate-200"
          )
        }
        title={collapsed ? label : undefined}
      >
        {({ isActive }) => (
          <>
            {isActive && <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-brand" />}
            <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-emerald-400")} />
            <span className={cn(collapsed && "md:hidden")}>{label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}
