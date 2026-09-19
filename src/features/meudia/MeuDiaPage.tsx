import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Check,
  Circle,
  CheckCircle2,
  MinusCircle,
  XCircle,
  Ban,
  ClipboardCheck,
  MapPin,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useProfile } from "@/context/ProfileContext";
import { eventosAgenda, visitaChecklistHoje, OBRA_DEMO_ID } from "@/mocks/demoObra";
import { getObraById } from "@/mocks/obras";
import type { EstadoChecklistItem, EventoAgenda, ItemChecklist } from "@/types";
import { cn } from "@/lib/utils";

const estados: { value: EstadoChecklistItem; label: string; icon: typeof Check; tone: string }[] = [
  { value: "executado", label: "Executado", icon: CheckCircle2, tone: "text-[var(--color-status-ok)] border-[var(--color-status-ok)]/30 bg-[var(--color-status-ok-bg)]" },
  { value: "parcial", label: "Parcial", icon: MinusCircle, tone: "text-[var(--color-status-warn)] border-[var(--color-status-warn)]/30 bg-[var(--color-status-warn-bg)]" },
  { value: "nao-executado", label: "Não executado", icon: XCircle, tone: "text-[var(--color-status-critical)] border-[var(--color-status-critical)]/30 bg-[var(--color-status-critical-bg)]" },
  { value: "nao-se-aplica", label: "Não se aplica", icon: Ban, tone: "text-slate-400 border-ink/15 bg-ink/[0.04]" },
];

interface ProgressoVisita {
  itens: ItemChecklist[];
  comentario: string;
  fotos: number;
  finalizado: boolean;
}

function checklistTemplateParaEvento(ev: EventoAgenda): ItemChecklist[] {
  if (ev.id === "ag-marcenaria-vistoria") {
    return visitaChecklistHoje.itens.map((i) => ({ ...i }));
  }
  return [
    { id: `${ev.id}-1`, label: "Atividade conforme planejado", estado: null },
    { id: `${ev.id}-2`, label: "Ambiente e acesso liberados", estado: null },
    { id: `${ev.id}-3`, label: "Materiais e ferramentas conforme especificado", estado: null },
    { id: `${ev.id}-4`, label: "Evidências fotográficas registradas", estado: null },
  ];
}

export function MeuDiaPage() {
  const navigate = useNavigate();
  const { nome } = useProfile();
  const obra = getObraById(OBRA_DEMO_ID);

  const roteiro = [...eventosAgenda]
    .filter((e) => e.status !== "cancelado")
    .sort((a, b) => a.horario.localeCompare(b.horario));

  const [selectedId, setSelectedId] = useState(
    roteiro.find((e) => e.id === "ag-marcenaria-vistoria")?.id ?? roteiro[0]?.id
  );
  const [progresso, setProgresso] = useState<Record<string, ProgressoVisita>>({});

  const selecionado = roteiro.find((e) => e.id === selectedId);
  const estadoAtual: ProgressoVisita =
    progresso[selectedId] ??
    (selecionado
      ? { itens: checklistTemplateParaEvento(selecionado), comentario: "", fotos: 0, finalizado: false }
      : { itens: [], comentario: "", fotos: 0, finalizado: false });

  function atualizarAtual(patch: Partial<ProgressoVisita>) {
    setProgresso((prev) => ({ ...prev, [selectedId]: { ...estadoAtual, ...patch } }));
  }

  function setEstado(id: string, estado: EstadoChecklistItem) {
    atualizarAtual({ itens: estadoAtual.itens.map((i) => (i.id === id ? { ...i, estado } : i)) });
  }

  const concluidos = estadoAtual.itens.filter((i) => i.estado !== null).length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Perfil Operacional / Campo"
        title={`Bom dia, ${nome.split(" ")[0]}.`}
        subtitle="Este é o seu roteiro de hoje."
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader title="Roteiro de hoje" subtitle={`${roteiro.length} compromissos agendados`} />
          <CardBody className="space-y-2.5">
            {roteiro.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedId(ev.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-[var(--radius-md)] border p-3.5 text-left transition-colors",
                  ev.id === selectedId
                    ? "border-brand-blue/40 bg-gradient-brand-soft"
                    : "border-ink/10 bg-ink/[0.03] hover:border-brand-blue/25 hover:bg-ink/[0.05]"
                )}
              >
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[var(--radius-sm)] bg-navy-700 text-center">
                  <span className="text-[13px] font-bold leading-none text-slate-50">{ev.horario}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-slate-100">{ev.titulo}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[12px] text-slate-500">
                    <MapPin className="h-3 w-3" /> {ev.ambiente} · {obra?.nome}
                  </p>
                  <p className="mt-1 text-[12.5px] text-slate-400">{ev.objetivo}</p>
                </div>
                {ev.id === selectedId ? (
                  <Badge tone="info">Em andamento</Badge>
                ) : progresso[ev.id]?.finalizado ? (
                  <Badge tone="ok">Concluída</Badge>
                ) : null}
              </button>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title={selecionado ? `Checklist — ${selecionado.titulo}` : "Checklist da visita"}
            subtitle={selecionado ? `${selecionado.horario} · ${selecionado.ambiente} · ${selecionado.objetivo}` : ""}
            action={<Badge tone="neutral">{concluidos}/{estadoAtual.itens.length}</Badge>}
          />
          <CardBody>
            {estadoAtual.finalizado ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand-soft">
                  <Sparkles className="h-8 w-8 text-brand-blue" />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-slate-100">Visita finalizada com sucesso</p>
                  <p className="mt-1 text-[13px] text-slate-500">A NextLine atualizou automaticamente:</p>
                </div>
                <div className="grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-2">
                  {[
                    `${estadoAtual.fotos || 3} evidências criadas`,
                    `Atividade "${selecionado?.titulo}" atualizada`,
                    "Diário de obra gerado",
                    "Dashboard da obra alimentado",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] px-3 py-2.5 text-[12.5px] text-slate-300">
                      <Check className="h-3.5 w-3.5 shrink-0 text-[var(--color-status-ok)]" /> {t}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button variant="secondary" onClick={() => navigate(`/obras/${OBRA_DEMO_ID}?tab=diario-obra`)}>
                    Ver diário gerado
                  </Button>
                  {(() => {
                    const proximo = roteiro.find((e) => e.id !== selectedId && !progresso[e.id]?.finalizado);
                    return proximo ? (
                      <Button variant="primary" onClick={() => setSelectedId(proximo.id)}>
                        Ir para próxima tarefa: {proximo.titulo}
                      </Button>
                    ) : null;
                  })()}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-2.5">
                  {estadoAtual.itens.map((item) => (
                    <div key={item.id} className="rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] p-3.5">
                      <p className="mb-2.5 text-[13.5px] font-medium text-slate-200">{item.label}</p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {estados.map((e) => {
                          const ActiveIcon = item.estado === e.value ? e.icon : Circle;
                          return (
                            <button
                              key={e.value}
                              onClick={() => setEstado(item.id, e.value)}
                              className={cn(
                                "flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-[var(--radius-sm)] border px-2 py-2 text-[11px] font-medium transition-colors",
                                item.estado === e.value ? e.tone : "border-ink/10 text-slate-500 hover:bg-ink/[0.05]"
                              )}
                            >
                              <ActiveIcon className="h-4 w-4" />
                              {e.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="mb-1.5 text-[12.5px] font-medium text-slate-400">Comentário</p>
                  <Textarea
                    rows={2}
                    placeholder="Observações sobre a visita..."
                    value={estadoAtual.comentario}
                    onChange={(e) => atualizarAtual({ comentario: e.target.value })}
                  />
                </div>

                <button
                  onClick={() => atualizarAtual({ fotos: estadoAtual.fotos + 1 })}
                  className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-brand-blue/30 py-6 text-[14px] font-semibold text-brand-blue transition-colors hover:bg-gradient-brand-soft"
                >
                  <Camera className="h-5 w-5" />
                  TIRAR FOTO {estadoAtual.fotos > 0 && `(${estadoAtual.fotos})`}
                </button>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  icon={<ClipboardCheck className="h-4.5 w-4.5" />}
                  onClick={() => atualizarAtual({ finalizado: true })}
                >
                  FINALIZAR VISITA
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
