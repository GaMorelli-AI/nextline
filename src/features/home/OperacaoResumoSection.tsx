import { useNavigate } from "react-router-dom";
import { ListChecks, Diamond, Truck } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { eventosAgenda, pendencias, milestones } from "@/mocks/demoObra";
import { fornecedores } from "@/mocks/fornecedores";
import { getObraById } from "@/mocks/obras";

export function OperacaoResumoSection() {
  const navigate = useNavigate();

  const agendaHoje = eventosAgenda.filter((e) => e.data === "10/09/2026");
  const pendenciasCriticas = pendencias.filter((p) => p.criticidade === "alta" && p.status !== "resolvido");
  const proximosMilestones = [...milestones].filter((m) => m.status !== "concluido").slice(0, 4);
  const fornecedoresComProblemas = fornecedores.filter((f) => f.ocorrencias > 0 || f.performance < 80);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader title="Agenda de Hoje" subtitle={`${agendaHoje.length} compromissos`} />
        <CardBody className="space-y-2">
          {agendaHoje.map((ev) => (
            <button
              key={ev.id}
              onClick={() => navigate(`/obras/${ev.obraId}?tab=agenda`)}
              className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] p-2.5 text-left hover:bg-ink/[0.05]"
            >
              <span className="shrink-0 text-[12px] font-bold text-brand-blue">{ev.horario}</span>
              <span className="min-w-0 flex-1 truncate text-[12px] text-slate-300">{ev.titulo}</span>
            </button>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Pendências Críticas" subtitle={`${pendenciasCriticas.length} em aberto`} />
        <CardBody className="space-y-2">
          {pendenciasCriticas.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(`/obras/${p.obraId}?tab=pendencias`)}
              className="flex w-full items-start gap-2.5 rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] p-2.5 text-left hover:bg-ink/[0.05]"
            >
              <ListChecks className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-status-critical)]" />
              <span className="min-w-0 flex-1 text-[12px] text-slate-300">{p.titulo}</span>
            </button>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Próximos Milestones" subtitle="Marcos críticos do portfólio" />
        <CardBody className="space-y-2">
          {proximosMilestones.map((m) => (
            <div key={m.id} className="flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] p-2.5">
              <Diamond className={m.status === "risco" ? "h-3.5 w-3.5 shrink-0 text-[var(--color-status-warn)]" : "h-3.5 w-3.5 shrink-0 text-brand-blue"} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] text-slate-300">{m.nome}</p>
                <p className="text-[10.5px] text-slate-500">{m.dataPrevista}</p>
              </div>
              {m.status === "risco" && <Badge tone="warn">Risco</Badge>}
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Fornecedores com Problemas" subtitle="Performance ou ocorrências recentes" />
        <CardBody className="space-y-2">
          {fornecedoresComProblemas.map((f) => (
            <div key={f.id} className="flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] p-2.5">
              <Truck className="h-3.5 w-3.5 shrink-0 text-slate-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] text-slate-300">{f.nome}</p>
                <p className="text-[10.5px] text-slate-500">{f.performance}% performance · {f.ocorrencias} ocorrência(s)</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
