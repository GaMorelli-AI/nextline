import { useNavigate } from "react-router-dom";
import { Search, Plus, Bell, HelpCircle, ChevronDown, LogOut, User, Settings, Building2, Menu, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { notificacoes } from "@/mocks/notificacoes";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const organizacoes = ["Kingline Engenharia", "New X Soluções", "NextLine Holding"];

export function Topbar({ onOpenMobileNav }: { onOpenMobileNav?: () => void }) {
  const navigate = useNavigate();
  const naoLidas = notificacoes.filter((n) => !n.lida).length;
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b border-ink/[0.06] bg-navy-900/80 px-3 backdrop-blur-md sm:gap-4 sm:px-6">
      <button
        onClick={onOpenMobileNav}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-slate-300 hover:bg-ink/[0.06] md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Org selector */}
      <Dropdown
        trigger={
          <button className="flex items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left transition-colors hover:bg-ink/[0.05]">
            <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-brand-soft text-emerald-300">
              <Building2 className="h-3.5 w-3.5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[13px] font-semibold leading-tight text-slate-100">Kingline Engenharia</p>
              <p className="text-[11px] leading-tight text-slate-500">Unidade São Paulo</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
          </button>
        }
      >
        <p className="px-3.5 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Organizações
        </p>
        {organizacoes.map((org) => (
          <DropdownItem key={org} icon={<Building2 className="h-4 w-4 text-slate-500" />}>
            {org}
          </DropdownItem>
        ))}
      </Dropdown>

      <div className="hidden h-6 w-px bg-ink/[0.08] sm:block" />

      {/* Global search */}
      <div className="hidden max-w-md flex-1 sm:block">
        <Input
          icon={<Search className="h-4 w-4" />}
          placeholder="Buscar obra, ativo, documento ou fornecedor..."
        />
      </div>

      <div className="min-w-0 flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-slate-400 hover:bg-ink/[0.06] hover:text-slate-100 sm:hidden">
          <Search className="h-[18px] w-[18px]" />
        </button>
        <Dropdown
          trigger={
            <Button variant="primary" size="md" icon={<Plus className="h-4 w-4" />} className="px-2.5 sm:px-4">
              <span className="hidden sm:inline">Novo</span>
            </Button>
          }
        >
          <DropdownItem onClick={() => navigate("/obras")}>Nova Obra</DropdownItem>
          <DropdownItem onClick={() => navigate("/obras/sala-sp?tab=diario-obra&novo=1")}>Novo Diário de Obra</DropdownItem>
          <DropdownItem onClick={() => navigate("/obras/sala-sp?tab=nao-conformidades")}>Nova Não Conformidade</DropdownItem>
          <DropdownItem onClick={() => navigate("/documentos")}>Novo Documento</DropdownItem>
          <DropdownItem onClick={() => navigate("/fornecedores")}>Novo Fornecedor</DropdownItem>
        </Dropdown>

        <Dropdown
          align="right"
          trigger={
            <button className="relative flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-slate-400 transition-colors hover:bg-ink/[0.06] hover:text-slate-100">
              <Bell className="h-[18px] w-[18px]" />
              {naoLidas > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-[var(--color-status-critical)] pulse-dot" />
              )}
            </button>
          }
          className="w-[340px] p-0"
        >
          <div className="border-b border-ink/[0.07] px-4 py-3">
            <p className="text-[13.5px] font-semibold text-slate-100">Notificações</p>
          </div>
          <div className="max-h-[360px] overflow-y-auto scrollbar-thin py-1">
            {notificacoes.slice(0, 5).map((n) => (
              <div key={n.id} className="flex gap-2.5 px-4 py-2.5 hover:bg-ink/[0.04]">
                <span
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    !n.lida ? "bg-emerald-400" : "bg-transparent"
                  )}
                />
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-slate-200">{n.titulo}</p>
                  <p className="text-[11.5px] text-slate-500">{n.data}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/notificacoes")}
            className="w-full border-t border-ink/[0.07] py-2.5 text-center text-[12.5px] font-medium text-emerald-400 hover:bg-ink/[0.04]"
          >
            Ver todas as notificações
          </button>
        </Dropdown>

        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
          className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-slate-400 transition-colors hover:bg-ink/[0.06] hover:text-slate-100"
        >
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        <button className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-slate-400 transition-colors hover:bg-ink/[0.06] hover:text-slate-100">
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>

        <div className="h-6 w-px bg-ink/[0.08]" />

        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2 rounded-[var(--radius-sm)] py-1 pl-1 pr-2 transition-colors hover:bg-ink/[0.05]">
              <Avatar initials="GM" size="sm" />
              <div className="hidden text-left md:block">
                <p className="text-[12.5px] font-semibold leading-tight text-slate-100">Gabriel Morelli</p>
                <p className="text-[11px] leading-tight text-slate-500">Administrador</p>
              </div>
            </button>
          }
        >
          <DropdownItem icon={<User className="h-4 w-4 text-slate-500" />}>Meu perfil</DropdownItem>
          <DropdownItem
            icon={<Settings className="h-4 w-4 text-slate-500" />}
            onClick={() => navigate("/configuracoes")}
          >
            Configurações
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem danger icon={<LogOut className="h-4 w-4" />}>
            Sair
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
