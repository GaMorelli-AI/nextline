import { useState } from "react";
import { MapPin, User, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { eventosAgenda } from "@/mocks/demoObra";
import type { EventoAgenda, Obra, StatusAgenda } from "@/types";

const statusTone: Record<StatusAgenda, "ok" | "warn" | "critical" | "info" | "neutral"> = {
  "aguardando-confirmacao": "warn",
  confirmado: "ok",
  realizado: "neutral",
  cancelado: "neutral",
  "nao-compareceu": "critical",
};

const statusLabel: Record<StatusAgenda, string> = {
  "aguardando-confirmacao": "Aguardando confirmação",
  confirmado: "Confirmado",
  realizado: "Realizado",
  cancelado: "Cancelado",
  "nao-compareceu": "Não compareceu",
};

export function AgendaObraTab({ obra }: { obra: Obra }) {
  const eventos = eventosAgenda.filter((e) => e.obraId === obra.id).sort((a, b) => (a.data + a.horario).localeCompare(b.data + b.horario));
  const [selected, setSelected] = useState<EventoAgenda | null>(null);

  if (eventos.length === 0) {
    return <EmptyState icon={<CalendarDays className="h-6 w-6" />} title="Sem eventos de agenda" description="Esta obra ainda não possui eventos cadastrados no protótipo." />;
  }

  return (
    <div className="space-y-3">
      {eventos.map((ev) => (
        <Card key={ev.id} hoverable onClick={() => setSelected(ev)} className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-16 shrink-0 flex-col items-center justify-center rounded-[var(--radius-sm)] bg-navy-700 text-center">
            <span className="text-[11px] text-slate-400">{ev.data.slice(0, 5)}</span>
            <span className="text-[13.5px] font-bold text-slate-50">{ev.horario}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-semibold text-slate-100">{ev.titulo}</p>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[12px] text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {ev.ambiente}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {ev.responsavel}
              </span>
            </p>
          </div>
          <Badge tone={statusTone[ev.status]}>{statusLabel[ev.status]}</Badge>
        </Card>
      ))}

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.titulo} subtitle={selected ? `${selected.data} às ${selected.horario}` : ""}>
        {selected && (
          <div className="space-y-5">
            <Badge tone={statusTone[selected.status]}>{statusLabel[selected.status]}</Badge>
            <p className="text-[13px] text-slate-300">{selected.objetivo}</p>
            {selected.observacoes && (
              <div className="rounded-[var(--radius-md)] border border-[var(--color-status-critical)]/25 bg-[var(--color-status-critical-bg)] p-3.5 text-[12.5px] text-slate-200">
                {selected.observacoes}
              </div>
            )}
            {selected.status === "aguardando-confirmacao" && (
              <Button variant="primary" className="w-full justify-center">
                CONFIRMAR COM FORNECEDOR
              </Button>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
