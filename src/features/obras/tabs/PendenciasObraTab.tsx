import { ListChecks } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { pendencias } from "@/mocks/demoObra";
import type { Obra, StatusPendencia } from "@/types";

const statusTone: Record<StatusPendencia, "ok" | "warn" | "critical" | "info" | "neutral"> = {
  aberto: "critical",
  "em-andamento": "info",
  "aguardando-terceiro": "warn",
  resolvido: "ok",
  vencido: "critical",
};

const statusLabel: Record<StatusPendencia, string> = {
  aberto: "Aberto",
  "em-andamento": "Em andamento",
  "aguardando-terceiro": "Aguardando terceiro",
  resolvido: "Resolvido",
  vencido: "Vencido",
};

const categoriaLabel: Record<string, string> = {
  aprovacao: "Aprovação",
  documento: "Documento",
  fornecedor: "Fornecedor",
  obra: "Obra",
  projeto: "Projeto",
};

export function PendenciasObraTab({ obra }: { obra: Obra }) {
  const lista = pendencias.filter((p) => p.obraId === obra.id);

  if (lista.length === 0) {
    return <EmptyState icon={<ListChecks className="h-6 w-6" />} title="Nenhuma pendência" description="Esta obra não possui pendências abertas no momento." />;
  }

  return (
    <div className="space-y-3">
      {lista.map((p) => (
        <Card key={p.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">{categoriaLabel[p.categoria]}</Badge>
              <p className="text-[13.5px] font-semibold text-slate-100">{p.titulo}</p>
            </div>
            <p className="mt-0.5 text-[12.5px] text-slate-400">{p.descricao}</p>
            {p.prazo && <p className="mt-1 text-[11.5px] text-slate-500">Prazo: {p.prazo}</p>}
          </div>
          <Badge tone={statusTone[p.status]}>{statusLabel[p.status]}</Badge>
        </Card>
      ))}
    </div>
  );
}
