import { useState, type ReactNode } from "react";
import { CalendarDays, Clock, MapPin, User, Camera, ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SegmentedControl } from "@/components/ui/Tabs";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Select, Textarea } from "@/components/ui/Input";
import { eventosAgenda } from "@/mocks/demoObra";
import { obras, getObraById } from "@/mocks/obras";
import type { EventoAgenda, StatusAgenda } from "@/types";
import { cn } from "@/lib/utils";

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

const views = [
  { key: "obra", label: "Obra" },
  { key: "hoje", label: "Hoje" },
  { key: "semana", label: "Semana" },
  { key: "proximos", label: "Próximos" },
  { key: "aguardando", label: "Aguardando confirmação" },
];

const obrasComEventos = obras.filter((o) => eventosAgenda.some((e) => e.obraId === o.id));

export function AgendaPage() {
  const [view, setView] = useState("hoje");
  const [obraFiltro, setObraFiltro] = useState(() => obrasComEventos[0]?.id ?? "");
  const [selected, setSelected] = useState<EventoAgenda | null>(null);

  const eventos = [...eventosAgenda].sort((a, b) => (a.data + a.horario).localeCompare(b.data + b.horario));

  const filtrados = eventos.filter((e) => {
    if (view === "obra") return e.obraId === obraFiltro;
    if (view === "hoje") return e.data === "10/09/2026";
    if (view === "semana") return true;
    if (view === "proximos") return e.data > "10/09/2026";
    if (view === "aguardando") return e.status === "aguardando-confirmacao";
    return true;
  });

  const porDia = filtrados.reduce<Record<string, EventoAgenda[]>>((acc, ev) => {
    (acc[ev.data] ??= []).push(ev);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Quem estará na obra, quando e para quê"
        title="Agenda"
        subtitle="Visitas, medições, instalações e confirmações com fornecedores."
      />

      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl options={views} active={view} onChange={setView} />
        {view === "obra" && obrasComEventos.length > 0 && (
          <Select value={obraFiltro} onChange={(e) => setObraFiltro(e.target.value)}>
            {obrasComEventos.map((o) => (
              <option key={o.id} value={o.id}>
                {o.nome}
              </option>
            ))}
          </Select>
        )}
      </div>

      <div className="space-y-6">
        {Object.entries(porDia).map(([data, eventosDoDia]) => (
          <div key={data}>
            <p className="mb-3 flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" /> {data}
            </p>
            <div className="space-y-2.5">
              {eventosDoDia.map((ev) => {
                const obra = getObraById(ev.obraId);
                return (
                  <Card key={ev.id} hoverable onClick={() => setSelected(ev)} className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-[var(--radius-sm)] bg-navy-700">
                      <span className="text-[13.5px] font-bold text-slate-50">{ev.horario}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-semibold text-slate-100">{ev.titulo}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {ev.ambiente} · {obra?.nome}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {ev.responsavel}
                        </span>
                      </p>
                    </div>
                    <Badge tone={statusTone[ev.status]}>{statusLabel[ev.status]}</Badge>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
        {filtrados.length === 0 && (
          <Card className="p-8 text-center text-[13px] text-slate-500">Nenhum evento nesta visão.</Card>
        )}
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.titulo} subtitle={selected ? `${selected.data} às ${selected.horario}` : ""}>
        {selected && (
          <div className="space-y-6">
            <Badge tone={statusTone[selected.status]}>{statusLabel[selected.status]}</Badge>

            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <Field icon={<MapPin className="h-3.5 w-3.5" />} label="Ambiente" value={selected.ambiente} />
              <Field icon={<Clock className="h-3.5 w-3.5" />} label="Obra" value={getObraById(selected.obraId)?.nome ?? "—"} />
              <Field icon={<User className="h-3.5 w-3.5" />} label="Responsável" value={selected.responsavel} />
              <Field icon={<CalendarDays className="h-3.5 w-3.5" />} label="Objetivo" value={selected.objetivo} />
            </div>

            {selected.observacoes && (
              <div className="rounded-[var(--radius-md)] border border-[var(--color-status-critical)]/25 bg-[var(--color-status-critical-bg)] p-3.5 text-[12.5px] text-slate-200">
                {selected.observacoes}
              </div>
            )}

            {selected.status === "realizado" && (
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">
                  <ImageIcon className="h-3.5 w-3.5" /> Evidências anexadas
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex aspect-square items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-navy-600 to-navy-800">
                      <ImageIcon className="h-4 w-4 text-slate-600" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-1.5 text-[12.5px] font-medium text-slate-400">Anexar observação</p>
              <Textarea rows={2} placeholder="Fotos, medidas, ocorrências..." />
            </div>

            <div className="flex gap-2 border-t border-ink/[0.07] pt-4">
              {selected.status === "aguardando-confirmacao" && (
                <Button variant="primary" className="flex-1">
                  CONFIRMAR COM FORNECEDOR
                </Button>
              )}
              <Button variant="secondary" icon={<Camera className="h-4 w-4" />}>
                Anexar foto
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function Field({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className={cn("flex items-center gap-1.5 text-[11.5px] text-slate-500")}>
        {icon} {label}
      </dt>
      <dd className="mt-0.5 font-medium text-slate-200">{value}</dd>
    </div>
  );
}
