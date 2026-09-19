import { useMemo, useRef, useState, type MouseEvent } from "react";
import { AlertTriangle, ChevronRight, Diamond, Users2, Building2, Truck, Plus, MapPin } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/Tabs";
import { Select, Input, Label } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { tarefasCronograma, milestones as milestonesData } from "@/mocks/demoObra";
import { getCronograma } from "@/mocks/cronograma";
import type { Milestone, Obra, TarefaCronograma } from "@/types";
import { cn } from "@/lib/utils";

function parseDate(d: string): number {
  const [dd, mm, yyyy] = d.split("/").map(Number);
  return new Date(yyyy, mm - 1, dd).getTime();
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

const statusBar: Record<string, string> = {
  "no-prazo": "bg-[var(--color-status-info)]",
  atencao: "bg-[var(--color-status-warn)]",
  atrasado: "bg-[var(--color-status-critical)]",
  concluido: "bg-[var(--color-status-ok)]",
};

const statusBadgeTone: Record<string, "ok" | "warn" | "critical" | "info"> = {
  "no-prazo": "info",
  atencao: "warn",
  atrasado: "critical",
  concluido: "ok",
};

const statusLabelMap: Record<string, string> = {
  "no-prazo": "No prazo",
  atencao: "Atenção",
  atrasado: "Atrasado",
  concluido: "Concluído",
};

const milestoneToneMap: Record<string, "ok" | "warn" | "critical" | "info"> = {
  concluido: "ok",
  "no-prazo": "info",
  risco: "warn",
  atrasado: "critical",
};

function tarefasFallback(obraId: string): TarefaCronograma[] {
  return getCronograma(obraId).map((a) => ({
    id: a.id,
    obraId,
    nome: a.atividade,
    disciplina: a.disciplina,
    responsavel: a.responsavel,
    fornecedor: a.responsavel,
    inicio: a.inicio,
    fim: a.fim,
    progresso: a.progresso,
    status: a.status,
    visivelCliente: true,
  }));
}

const views = [
  { key: "interno", label: "Interno" },
  { key: "cliente", label: "Cliente" },
  { key: "fornecedor", label: "Fornecedor" },
];

// Grid template used for the header + every row: 2.4fr 1fr 0.9fr 0.9fr 2fr 0.9fr
// (total 8.1fr). The "Progresso" column is the 5th one — these constants
// convert that into a left/width percentage so the marker overlay lines up
// with the bars without measuring the DOM. Keep in sync with GRID_COLS below.
const GRID_COLS = "grid-cols-[2.4fr_1fr_0.9fr_0.9fr_2fr_0.9fr]";
const GANTT_LEFT_PCT = ((2.4 + 1 + 0.9 + 0.9) / 8.1) * 100;
const GANTT_WIDTH_PCT = (2 / 8.1) * 100;

let nextMarcoId = 1;

export function CronogramaRico({ obra }: { obra: Obra }) {
  const [view, setView] = useState("interno");
  const [fornecedorSel, setFornecedorSel] = useState("");
  const [expandido, setExpandido] = useState<Record<string, boolean>>({ "t-marcenaria": true });
  const [simulado, setSimulado] = useState(false);
  const [milestonesLocal, setMilestonesLocal] = useState<Milestone[]>(() => milestonesData.filter((m) => m.obraId === obra.id));
  const [novoMarco, setNovoMarco] = useState<{ nome: string; data: string; status: Milestone["status"] } | null>(null);
  const rulerRef = useRef<HTMLDivElement>(null);

  const tarefasObra = useMemo(() => {
    const ricas = tarefasCronograma.filter((t) => t.obraId === obra.id);
    return ricas.length > 0 ? ricas : tarefasFallback(obra.id);
  }, [obra.id]);

  const fornecedoresDisponiveis = useMemo(
    () => Array.from(new Set(tarefasObra.map((t) => t.fornecedor).filter(Boolean))) as string[],
    [tarefasObra]
  );
  const fornecedorEfetivo = fornecedorSel || fornecedoresDisponiveis[0] || "";

  const tarefasVisiveis = useMemo(() => {
    let base = tarefasObra;
    if (view === "cliente") base = base.filter((t) => t.visivelCliente);
    if (view === "fornecedor") base = base.filter((t) => t.fornecedor === fornecedorEfetivo);
    return base;
  }, [tarefasObra, view, fornecedorEfetivo]);

  // Monta a árvore: pais primeiro, filhos logo abaixo (respeitando expandido)
  const linhas = useMemo(() => {
    const pais = tarefasVisiveis.filter((t) => !t.parentId);
    const out: TarefaCronograma[] = [];
    for (const pai of pais) {
      out.push(pai);
      if (expandido[pai.id]) {
        out.push(...tarefasVisiveis.filter((t) => t.parentId === pai.id));
      }
    }
    return out;
  }, [tarefasVisiveis, expandido]);

  const allDates = [
    ...tarefasVisiveis.map((t) => parseDate(t.inicio)),
    ...tarefasVisiveis.map((t) => parseDate(t.fim)),
    ...milestonesLocal.map((m) => parseDate(m.dataPrevista)),
  ];
  const min = allDates.length ? Math.min(...allDates) : Date.now();
  const max = allDates.length ? Math.max(...allDates) : Date.now() + 30 * 86400000;
  const span = max - min || 1;

  const milestoneRisco = milestonesLocal.find((m) => m.status === "risco");
  const temAtraso = tarefasVisiveis.some((t) => t.status === "atrasado") || simulado;
  const afetadosPorAtraso = useMemo(
    () => new Set(tarefasVisiveis.filter((t) => t.status !== "concluido" && t.status !== "atrasado").map((t) => t.id)),
    [tarefasVisiveis]
  );

  function abrirNovoMarco(dataSugerida?: string) {
    setNovoMarco({ nome: "", data: dataSugerida ?? formatDate(Date.now()), status: "no-prazo" });
  }

  function handleRulerClick(e: MouseEvent<HTMLDivElement>) {
    if (!rulerRef.current) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const ts = min + pct * span;
    abrirNovoMarco(formatDate(ts));
  }

  function salvarNovoMarco() {
    if (!novoMarco || !novoMarco.nome.trim()) return;
    const [dd, mm, yyyy] = novoMarco.data.split("/").map(Number);
    if (!dd || !mm || !yyyy) return;
    const marco: Milestone = {
      id: `marco-custom-${nextMarcoId++}`,
      obraId: obra.id,
      nome: novoMarco.nome.trim(),
      dataPrevista: novoMarco.data,
      status: novoMarco.status,
    };
    setMilestonesLocal((prev) => [...prev, marco].sort((a, b) => parseDate(a.dataPrevista) - parseDate(b.dataPrevista)));
    setNovoMarco(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SegmentedControl options={views} active={view} onChange={setView} />
        {view === "fornecedor" && fornecedoresDisponiveis.length > 0 && (
          <Select value={fornecedorEfetivo} onChange={(e) => setFornecedorSel(e.target.value)}>
            {fornecedoresDisponiveis.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
        )}
      </div>

      {(temAtraso || simulado) && (
        <div className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-status-critical)]/25 bg-[var(--color-status-critical-bg)] px-5 py-4">
          <AlertTriangle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--color-status-critical)]" />
          <div>
            <p className="text-[13.5px] font-semibold text-slate-100">Risco de atraso</p>
            <p className="mt-0.5 text-[13px] text-slate-300">
              {simulado
                ? milestoneRisco
                  ? `Simulação ativa: atividades em andamento atrasariam 5 dias adicionais. O marco "${milestoneRisco.nome}" passaria a ultrapassar o prazo em ${(milestoneRisco.diasRisco ?? 6) + 5} dias.`
                  : "Simulação ativa: atividades em andamento atrasariam 5 dias adicionais."
                : milestoneRisco?.descricaoRisco ?? "Uma ou mais atividades estão atrasadas em relação ao planejado."}
            </p>
          </div>
        </div>
      )}

      {view === "interno" && (
        <Card className="border-brand-blue/15">
          <CardHeader
            title="Marcos Críticos"
            subtitle="Datas fixas — não são deslocadas automaticamente pelo cronograma"
            action={
              <Button variant="outline" size="sm" icon={<Plus className="h-3.5 w-3.5" />} onClick={() => abrirNovoMarco()}>
                Adicionar marco
              </Button>
            }
          />
          <CardBody className="flex flex-wrap gap-3">
            {milestonesLocal.length === 0 && (
              <p className="text-[12.5px] text-slate-500">Nenhum marco crítico definido ainda para esta obra.</p>
            )}
            {milestonesLocal.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px]",
                  m.status === "risco" ? "border-[var(--color-status-warn)]/40 bg-[var(--color-status-warn-bg)]" : "border-ink/10 bg-ink/[0.03]"
                )}
              >
                <Diamond className={cn("h-3.5 w-3.5", m.status === "risco" && "text-[var(--color-status-warn)]")} />
                <span className="font-medium text-slate-200">{m.nome}</span>
                <span className="text-slate-500">{m.dataPrevista}</span>
                <Badge tone={milestoneToneMap[m.status]}>{m.status === "risco" ? "Risco" : statusLabelMap[m.status] ?? m.status}</Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      <Card className="border-brand-blue/15 shadow-[var(--shadow-card)]">
        <CardHeader
          title="Cronograma físico"
          subtitle="Atividades, subtarefas, predecessoras, marcos e progresso — clique na régua para adicionar um marco"
          action={
            <div className="flex items-center gap-2">
              {view === "interno" && (
                <Button variant="outline" size="sm" icon={<MapPin className="h-3.5 w-3.5" />} onClick={() => abrirNovoMarco()}>
                  Adicionar marco
                </Button>
              )}
              {view === "interno" && (
                <Button variant={simulado ? "danger" : "outline"} size="sm" onClick={() => setSimulado((s) => !s)}>
                  {simulado ? "Reverter simulação" : "Simular atraso +5 dias"}
                </Button>
              )}
            </div>
          }
        />
        <CardBody>
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[900px]">
              <div className={cn("grid items-center gap-3 border-b border-ink/[0.07] pb-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500", GRID_COLS)}>
                <span>Atividade</span>
                <span>Responsável</span>
                <span>Início</span>
                <span>Fim</span>
                <span className="relative">
                  Progresso
                  <span className="ml-1.5 font-normal normal-case text-slate-600">(clique abaixo para marcar)</span>
                </span>
                <span>Status</span>
              </div>

              {/* Régua clicável — alinhada à coluna Progresso; clique adiciona um marco na data correspondente */}
              <div className={cn("relative grid gap-3 py-1.5", GRID_COLS)}>
                <span />
                <span />
                <span />
                <span />
                <div
                  ref={rulerRef}
                  onClick={handleRulerClick}
                  className="group relative h-5 cursor-crosshair rounded-[6px] border border-dashed border-brand-blue/25 bg-gradient-brand-soft transition-colors hover:border-brand-blue/50"
                  title="Clique para adicionar um marco nesta data"
                >
                  <span className="absolute inset-0 flex items-center justify-center gap-1 text-[10px] font-medium text-brand-blue opacity-0 transition-opacity group-hover:opacity-100">
                    <Plus className="h-3 w-3" /> Clique para adicionar marco
                  </span>
                </div>
                <span />
              </div>

              <div className="relative divide-y divide-ink/[0.06]">
                {/* Overlay dos marcos — linhas verticais atravessando todas as linhas do Gantt */}
                <div className="pointer-events-none absolute inset-y-0" style={{ left: `${GANTT_LEFT_PCT}%`, width: `${GANTT_WIDTH_PCT}%` }}>
                  {milestonesLocal.map((m) => {
                    const pct = ((parseDate(m.dataPrevista) - min) / span) * 100;
                    if (pct < -1 || pct > 101) return null;
                    return (
                      <div key={m.id} className="absolute inset-y-0" style={{ left: `${pct}%` }}>
                        <div
                          className={cn(
                            "absolute inset-y-0 w-px",
                            m.status === "risco" ? "bg-[var(--color-status-warn)]/50" : "bg-brand-blue/30"
                          )}
                        />
                      </div>
                    );
                  })}
                </div>

                {linhas.length === 0 && (
                  <p className="py-6 text-center text-[12.5px] text-slate-500">
                    Nenhuma atividade cadastrada para esta obra ainda.
                  </p>
                )}

                {linhas.map((t) => {
                  const isParent = !t.parentId && tarefasVisiveis.some((c) => c.parentId === t.id);
                  const isChild = !!t.parentId;
                  const afetado = simulado && afetadosPorAtraso.has(t.id);
                  const statusEfetivo = afetado ? "atrasado" : t.status;
                  const s = parseDate(t.inicio);
                  const e = parseDate(t.fim);
                  const left = ((s - min) / span) * 100;
                  const width = Math.max(1.5, ((e - s) / span) * 100);
                  return (
                    <div key={t.id} className={cn("grid items-center gap-3 py-3", GRID_COLS, isChild && "bg-ink/[0.015]")}>
                      <div className={cn("min-w-0", isChild && "pl-7")}>
                        <div className="flex items-center gap-1.5">
                          {isParent && (
                            <button onClick={() => setExpandido((p) => ({ ...p, [t.id]: !p[t.id] }))}>
                              <ChevronRight className={cn("h-3.5 w-3.5 text-slate-500 transition-transform", expandido[t.id] && "rotate-90")} />
                            </button>
                          )}
                          <p className="truncate text-[13.5px] font-medium text-slate-100">{t.nome}</p>
                          {t.isMilestone && <Diamond className="h-3 w-3 shrink-0 text-brand-blue" />}
                          {afetado && <Badge tone="critical">+5d</Badge>}
                        </div>
                        <p className="text-[11.5px] text-slate-500">
                          {t.disciplina}
                          {t.predecessoras?.length ? (
                            <span className="ml-1.5">
                              · depende de {t.predecessoras.map((id) => tarefasCronograma.find((x) => x.id === id)?.nome).join(", ")}
                            </span>
                          ) : null}
                        </p>
                      </div>
                      <span className="truncate text-[12.5px] text-slate-400">{t.responsavel}</span>
                      <span className="text-[12.5px] text-slate-400">{t.inicio}</span>
                      <span className="text-[12.5px] text-slate-400">{t.fim}</span>
                      <div className="relative h-7 rounded-full bg-ink/[0.04]">
                        <div className={cn("absolute top-0 h-full rounded-full opacity-25", statusBar[statusEfetivo])} style={{ left: `${left}%`, width: `${width}%` }} />
                        <div className={cn("absolute top-0 h-full rounded-full", statusBar[statusEfetivo])} style={{ left: `${left}%`, width: `${(width * t.progresso) / 100}%` }} />
                        <span className="absolute inset-0 flex items-center justify-end pr-2 text-[11px] font-medium text-slate-200">{t.progresso}%</span>
                      </div>
                      <div>
                        <Badge tone={statusBadgeTone[statusEfetivo]}>{statusLabelMap[statusEfetivo]}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-4 text-[11.5px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <Users2 className="h-3.5 w-3.5" /> Visão Interna: cronograma operacional completo
        </span>
        <span className="flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" /> Visão Cliente: apenas o publicado, sem buffers internos
        </span>
        <span className="flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5" /> Visão Fornecedor: somente as atividades daquele fornecedor
        </span>
      </div>

      <Modal open={!!novoMarco} onClose={() => setNovoMarco(null)} title="Adicionar marco crítico" size="sm" footer={
        <>
          <Button variant="ghost" onClick={() => setNovoMarco(null)}>Cancelar</Button>
          <Button variant="primary" onClick={salvarNovoMarco} disabled={!novoMarco?.nome.trim()}>Adicionar</Button>
        </>
      }>
        {novoMarco && (
          <div className="space-y-4">
            <div>
              <Label>Nome do marco</Label>
              <Input placeholder="Ex: Vistoria final elétrica" value={novoMarco.nome} onChange={(e) => setNovoMarco({ ...novoMarco, nome: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data prevista</Label>
                <Input placeholder="DD/MM/AAAA" value={novoMarco.data} onChange={(e) => setNovoMarco({ ...novoMarco, data: e.target.value })} />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={novoMarco.status} onChange={(e) => setNovoMarco({ ...novoMarco, status: e.target.value as Milestone["status"] })}>
                  <option value="no-prazo">No prazo</option>
                  <option value="risco">Risco</option>
                  <option value="atrasado">Atrasado</option>
                  <option value="concluido">Concluído</option>
                </Select>
              </div>
            </div>
            <p className="text-[11.5px] text-slate-500">
              O marco aparecerá em "Marcos Críticos" e como uma linha vertical no cronograma abaixo.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
