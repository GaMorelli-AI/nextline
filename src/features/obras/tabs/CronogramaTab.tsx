import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getCronograma } from "@/mocks/cronograma";
import type { Obra } from "@/types";
import { cn } from "@/lib/utils";

function parseDate(d: string): number {
  const [dd, mm, yyyy] = d.split("/").map(Number);
  return new Date(yyyy, mm - 1, dd).getTime();
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

export function CronogramaTab({ obra }: { obra: Obra }) {
  const atividades = getCronograma(obra.id);
  const temAtraso = atividades.some((a) => a.status === "atrasado");

  if (atividades.length === 0) {
    return (
      <Card>
        <CardBody className="py-16 text-center text-[13.5px] text-slate-500">
          Cronograma detalhado ainda não disponível para esta obra no protótipo.
        </CardBody>
      </Card>
    );
  }

  const starts = atividades.map((a) => parseDate(a.inicio));
  const ends = atividades.map((a) => parseDate(a.fim));
  const min = Math.min(...starts);
  const max = Math.max(...ends);
  const span = max - min;

  return (
    <div className="space-y-5">
      {temAtraso && (
        <div className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-status-critical)]/25 bg-[var(--color-status-critical-bg)] px-5 py-4">
          <AlertTriangle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--color-status-critical)]" />
          <div>
            <p className="text-[13.5px] font-semibold text-slate-100">Impacto previsto</p>
            <p className="mt-0.5 text-[13px] text-slate-300">
              Os atrasos atuais podem impactar a entrega final em aproximadamente 6 dias.
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader title="Cronograma físico" subtitle="Visualização de atividades e progresso por disciplina" />
        <CardBody>
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[820px]">
              {/* Header row */}
              <div className="grid grid-cols-[2fr_1.1fr_0.9fr_0.9fr_2.2fr_0.9fr] gap-3 border-b border-ink/[0.07] pb-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <span>Atividade</span>
                <span>Responsável</span>
                <span>Início</span>
                <span>Fim</span>
                <span>Progresso</span>
                <span>Status</span>
              </div>
              <div className="divide-y divide-ink/[0.06]">
                {atividades.map((a) => {
                  const s = parseDate(a.inicio);
                  const e = parseDate(a.fim);
                  const left = ((s - min) / span) * 100;
                  const width = Math.max(2, ((e - s) / span) * 100);
                  return (
                    <div
                      key={a.id}
                      className="grid grid-cols-[2fr_1.1fr_0.9fr_0.9fr_2.2fr_0.9fr] items-center gap-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-medium text-slate-100">{a.atividade}</p>
                        <p className="text-[11.5px] text-slate-500">{a.disciplina}</p>
                      </div>
                      <span className="truncate text-[12.5px] text-slate-400">{a.responsavel}</span>
                      <span className="text-[12.5px] text-slate-400">{a.inicio}</span>
                      <span className="text-[12.5px] text-slate-400">{a.fim}</span>
                      <div className="relative h-6 rounded-full bg-ink/[0.04]">
                        <div
                          className={cn("absolute top-0 h-full rounded-full", statusBar[a.status], "opacity-25")}
                          style={{ left: `${left}%`, width: `${width}%` }}
                        />
                        <div
                          className={cn("absolute top-0 h-full rounded-full", statusBar[a.status])}
                          style={{ left: `${left}%`, width: `${(width * a.progresso) / 100}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-end pr-2 text-[11px] font-medium text-slate-200">
                          {a.progresso}%
                        </span>
                      </div>
                      <div>
                        <Badge tone={statusBadgeTone[a.status]}>{statusLabelMap[a.status]}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
