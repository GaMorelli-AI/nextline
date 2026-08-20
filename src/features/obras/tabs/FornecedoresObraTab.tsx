import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getFornecedoresByObra } from "@/mocks/fornecedores";
import type { Obra } from "@/types";

export function FornecedoresObraTab({ obra }: { obra: Obra }) {
  const fornecedores = getFornecedoresByObra(obra.id);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {fornecedores.map((f) => (
        <Card key={f.id} className="p-5">
          <div className="flex items-center gap-3">
            <Avatar initials={f.nome.slice(0, 2).toUpperCase()} size="md" />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-slate-100">{f.nome}</p>
              <p className="truncate text-[12px] text-slate-500">{f.especialidade}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-[12px] text-slate-500">
              <span>Performance</span>
              <span className="font-medium text-slate-200">{f.performance}%</span>
            </div>
            <ProgressBar value={f.performance} tone={f.performance >= 85 ? "ok" : f.performance >= 70 ? "brand" : "warn"} size="sm" />
          </div>
          <div className="mt-4 flex items-center justify-between text-[12.5px]">
            <span className="text-slate-500">Ocorrências</span>
            <Badge tone={f.ocorrencias === 0 ? "ok" : f.ocorrencias <= 2 ? "warn" : "critical"}>{f.ocorrencias}</Badge>
          </div>
          <div className="mt-2 flex items-center justify-between text-[12.5px]">
            <span className="text-slate-500">Avaliação</span>
            <span className="font-medium text-slate-200">★ {f.avaliacao.toFixed(1)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
