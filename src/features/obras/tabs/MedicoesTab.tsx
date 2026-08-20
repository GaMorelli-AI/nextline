import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { ApprovalWorkflow } from "@/components/ui/ApprovalWorkflow";
import { Button } from "@/components/ui/Button";
import { getMedicoesByObra, etapasAprovacao } from "@/mocks/contratosMedicoes";
import { formatCurrency } from "@/lib/utils";
import type { Obra } from "@/types";

export function MedicoesTab({ obra }: { obra: Obra }) {
  const medicoes = getMedicoesByObra(obra.id);

  return (
    <div className="space-y-4">
      {medicoes.map((m) => (
        <Card key={m.id}>
          <CardHeader
            title={m.numero}
            subtitle={`Data de referência: ${m.data}`}
            action={<Badge tone={statusToTone(m.status)}>{statusLabel(m.status)}</Badge>}
          />
          <CardBody>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="shrink-0">
                <p className="text-[11.5px] text-slate-500">Valor</p>
                <p className="text-[22px] font-semibold text-slate-50">{formatCurrency(m.valor)}</p>
              </div>
              <div className="hidden h-10 w-px bg-ink/[0.08] lg:block" />
              <div className="flex-1">
                <ApprovalWorkflow etapas={etapasAprovacao} etapaAtual={m.etapaAtual} />
              </div>
              {m.status === "aguardando" && (
                <div className="flex shrink-0 gap-2">
                  <Button variant="secondary">Rejeitar</Button>
                  <Button variant="primary">Aprovar Etapa</Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
