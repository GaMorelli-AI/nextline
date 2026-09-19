import { History } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { timelineEventos, resumoDesdeUltimaVisita } from "@/mocks/demoObra";
import type { Obra } from "@/types";

export function HistoricoObraTab({ obra }: { obra: Obra }) {
  const eventos = timelineEventos.filter((e) => e.obraId === obra.id);

  if (eventos.length === 0) {
    return <EmptyState icon={<History className="h-6 w-6" />} title="Sem histórico" description="Esta obra ainda não possui eventos registrados no protótipo." />;
  }

  const resumo = [
    `${resumoDesdeUltimaVisita.novosProjetos} novo(s) projeto(s)`,
    `${resumoDesdeUltimaVisita.atividadesConcluidas} atividades concluídas`,
    `${resumoDesdeUltimaVisita.fornecedoresAtrasados} fornecedor atrasado`,
    `${resumoDesdeUltimaVisita.novasEvidencias} novas evidências`,
    `${resumoDesdeUltimaVisita.aprovacoesRealizadas} aprovação realizada`,
  ];

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="O que mudou desde sua última visita" />
        <CardBody className="flex flex-wrap gap-2">
          {resumo.map((r) => (
            <span key={r} className="rounded-full border border-brand-blue/25 bg-gradient-brand-soft px-3 py-1.5 text-[12px] text-slate-200">
              {r}
            </span>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Linha do tempo da obra" subtitle="Eventos consolidados de todos os módulos" />
        <CardBody>
          <div className="relative space-y-5 pl-5">
            <div className="absolute bottom-1 left-[5px] top-1 w-px bg-ink/[0.08]" />
            {eventos.map((ev) => (
              <div key={ev.id} className="relative">
                <span className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full border-2 border-navy-800 bg-brand-blue" />
                <p className="text-[12px] text-slate-500">
                  {ev.data} — {ev.hora} · {ev.usuario}
                </p>
                <p className="mt-0.5 text-[13px] text-slate-200">{ev.descricao}</p>
                <p className="text-[11px] text-slate-600">{ev.origem}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
