import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { timelineEventos, milestones, OBRA_DEMO_ID } from "@/mocks/demoObra";
import { naoConformidades } from "@/mocks/ncs";

export function ImpactosTimelineSection() {
  const navigate = useNavigate();

  const impactos = [
    ...milestones
      .filter((m) => m.status === "risco")
      .map((m) => ({ id: m.id, texto: `${m.nome} — ${m.descricaoRisco}`, href: `/cronograma?obra=${OBRA_DEMO_ID}` })),
    ...naoConformidades
      .filter((n) => n.severidade === "alta" && n.status !== "resolvida")
      .map((n) => ({ id: n.id, texto: `${n.id} — ${n.descricao}`, href: `/obras/${n.obraId}?tab=nao-conformidades` })),
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader title="Impactos Detectados" subtitle="Riscos identificados automaticamente pela NextLine" />
        <CardBody className="space-y-2.5">
          {impactos.map((im) => (
            <button
              key={im.id}
              onClick={() => navigate(im.href)}
              className="flex w-full items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-status-warn)]/20 bg-[var(--color-status-warn-bg)] p-3 text-left hover:brightness-110"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-status-warn)]" />
              <span className="text-[12.5px] text-slate-200">{im.texto}</span>
            </button>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Últimas Atualizações" subtitle="O que aconteceu recentemente na operação" />
        <CardBody>
          <div className="relative space-y-4 pl-5">
            <div className="absolute bottom-1 left-[5px] top-1 w-px bg-ink/[0.08]" />
            {timelineEventos.slice(0, 5).map((ev) => (
              <div key={ev.id} className="relative">
                <span className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full border-2 border-navy-800 bg-brand-blue" />
                <p className="text-[11.5px] text-slate-500">
                  {ev.data} · {ev.hora}
                </p>
                <p className="mt-0.5 text-[13px] text-slate-200">{ev.descricao}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
