import { Clock, FileCheck2, ShieldAlert, FileText, NotebookPen, SettingsIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { notificacoes } from "@/mocks/notificacoes";
import { cn } from "@/lib/utils";
import type { Notificacao } from "@/types";

const tipoIcon: Record<Notificacao["tipo"], typeof Clock> = {
  atraso: Clock,
  aprovacao: FileCheck2,
  nc: ShieldAlert,
  documento: FileText,
  rdo: NotebookPen,
  sistema: SettingsIcon,
};

const tipoTone: Record<Notificacao["tipo"], string> = {
  atraso: "bg-[var(--color-status-warn-bg)] text-[var(--color-status-warn)]",
  aprovacao: "bg-[var(--color-status-info-bg)] text-[var(--color-status-info)]",
  nc: "bg-[var(--color-status-critical-bg)] text-[var(--color-status-critical)]",
  documento: "bg-ink/[0.06] text-slate-400",
  rdo: "bg-gradient-brand-soft text-emerald-300",
  sistema: "bg-ink/[0.06] text-slate-400",
};

const periodos: { key: Notificacao["periodo"]; label: string }[] = [
  { key: "hoje", label: "Hoje" },
  { key: "ontem", label: "Ontem" },
  { key: "semana", label: "Esta semana" },
];

export function NotificacoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Central de Notificações"
        title="Notificações"
        subtitle="Todos os alertas de atrasos, aprovações, não conformidades e documentos."
        actions={<Button variant="outline">Marcar todas como lidas</Button>}
      />

      <div className="space-y-8">
        {periodos.map((periodo) => {
          const items = notificacoes.filter((n) => n.periodo === periodo.key);
          if (items.length === 0) return null;
          return (
            <div key={periodo.key}>
              <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">{periodo.label}</p>
              <div className="space-y-2.5">
                {items.map((n) => {
                  const Icon = tipoIcon[n.tipo];
                  return (
                    <Card key={n.id} hoverable className={cn("flex items-start gap-3.5 p-4", !n.lida && "border-emerald-400/20")}>
                      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)]", tipoTone[n.tipo])}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-[13.5px] font-medium text-slate-100">{n.titulo}</p>
                          {!n.lida && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />}
                        </div>
                        <p className="mt-0.5 text-[12.5px] text-slate-400">{n.descricao}</p>
                      </div>
                      <span className="shrink-0 whitespace-nowrap text-[11.5px] text-slate-500">{n.data}</span>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
