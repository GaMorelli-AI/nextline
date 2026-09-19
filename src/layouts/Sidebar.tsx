import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Sun,
  HardHat,
  GanttChartSquare,
  ListChecks,
  CalendarDays,
  FolderKanban,
  ShoppingCart,
  BarChart2,
  ShieldCheck,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  X,
  Landmark,
  Boxes,
  Wrench,
  Box,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNextAI } from "@/context/NextAIContext";
import { useProfile } from "@/context/ProfileContext";
import { useTheme } from "@/context/ThemeContext";
import type { Perfil } from "@/types";

interface NavItemDef {
  to: string;
  label: string;
  icon: typeof LayoutGrid;
  end?: boolean;
  perfis: Perfil[];
}

const mainNav: NavItemDef[] = [
  { to: "/", label: "Visão Geral", icon: LayoutGrid, end: true, perfis: ["gestor", "operacional", "cliente", "fornecedor"] },
  { to: "/meu-dia", label: "Meu Dia", icon: Sun, perfis: ["gestor", "operacional"] },
  { to: "/obras", label: "Obras", icon: HardHat, perfis: ["gestor", "operacional"] },
  { to: "/cronograma", label: "Cronograma", icon: GanttChartSquare, perfis: ["gestor", "operacional", "cliente", "fornecedor"] },
  { to: "/pendencias", label: "Pendências", icon: ListChecks, perfis: ["gestor", "operacional", "cliente"] },
  { to: "/agenda", label: "Agenda", icon: CalendarDays, perfis: ["gestor", "operacional", "cliente", "fornecedor"] },
  { to: "/documentos", label: "Projetos e Documentos", icon: FolderKanban, perfis: ["gestor", "operacional", "cliente", "fornecedor"] },
  { to: "/compras", label: "Compras e Fornecedores", icon: ShoppingCart, perfis: ["gestor", "operacional", "fornecedor"] },
  { to: "/relatorios", label: "Relatórios", icon: BarChart2, perfis: ["gestor", "operacional", "cliente"] },
];

const roadmapNav: NavItemDef[] = [
  { to: "/patrimonio", label: "Patrimônio", icon: Landmark, perfis: ["gestor"] },
  { to: "/ativos", label: "Ativos", icon: Boxes, perfis: ["gestor"] },
  { to: "/facilities", label: "Facilities", icon: Wrench, perfis: ["gestor"] },
  { to: "/bim", label: "BIM", icon: Box, perfis: ["gestor"] },
  { to: "/analytics", label: "Analytics", icon: BarChart3, perfis: ["gestor"] },
];

const adminNav: NavItemDef[] = [
  { to: "/administracao", label: "Usuários, Perfis e Permissões", icon: ShieldCheck, perfis: ["gestor"] },
  { to: "/configuracoes", label: "Configurações", icon: Settings, perfis: ["gestor"] },
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
  const { perfil } = useProfile();
  const { theme } = useTheme();

  const visibleMain = mainNav.filter((i) => i.perfis.includes(perfil));
  const visibleRoadmap = roadmapNav.filter((i) => i.perfis.includes(perfil));
  const visibleAdmin = adminNav.filter((i) => i.perfis.includes(perfil));

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
          <img src="/brand/nextline-mark.png" alt="NextLine" className="h-8 w-8 shrink-0 rounded-[8px]" />
          {!collapsed && (
            <img
              src={theme === "dark" ? "/brand/nextline-wordmark-dark.png" : "/brand/nextline-wordmark-light.png"}
              alt="NextLine"
              className="h-[18px] w-auto"
            />
          )}
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
          {visibleMain.map((item) => (
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
          <img src="/brand/nextline-symbol.png" alt="" className="h-[18px] w-[18px] shrink-0 object-contain" />
          <span className={cn("text-gradient-brand font-semibold", collapsed && "md:hidden")}>Next AI</span>
        </button>

        {visibleRoadmap.length > 0 && (
          <>
            <div className="my-3 h-px bg-ink/[0.07]" />
            {!collapsed && (
              <p className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-slate-600">
                Roadmap · Em breve
              </p>
            )}
            <ul className="space-y-0.5 opacity-60">
              {visibleRoadmap.map((item) => (
                <NavItem key={item.to} {...item} collapsed={collapsed} onNavigate={onCloseMobile} muted />
              ))}
            </ul>
          </>
        )}

        {visibleAdmin.length > 0 && (
          <>
            <div className="my-3 h-px bg-ink/[0.07]" />
            <ul className="space-y-0.5">
              {visibleAdmin.map((item) => (
                <NavItem key={item.to} {...item} collapsed={collapsed} onNavigate={onCloseMobile} />
              ))}
            </ul>
          </>
        )}
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
  muted = false,
}: NavItemDef & { collapsed: boolean; onNavigate?: () => void; muted?: boolean }) {
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
            isActive && !muted
              ? "bg-gradient-brand-soft text-slate-50"
              : "text-slate-400 hover:bg-ink/[0.05] hover:text-slate-200"
          )
        }
        title={collapsed ? label : undefined}
      >
        {({ isActive }) => (
          <>
            {isActive && !muted && <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-blue" />}
            <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive && !muted && "text-brand-blue")} />
            <span className={cn("truncate", collapsed && "md:hidden")}>{label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}
