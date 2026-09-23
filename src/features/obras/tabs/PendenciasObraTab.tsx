import { useState } from "react";
import { ListChecks } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { useProfile } from "@/context/ProfileContext";
import { pendencias } from "@/mocks/demoObra";
import { categoriaLabel, agora, statusLabel, statusTone } from "@/features/pendencias/pendenciaMaps";
import { PendenciaDrawer } from "@/features/pendencias/PendenciaDrawer";
import type { Obra, Pendencia } from "@/types";

export function PendenciasObraTab({ obra }: { obra: Obra }) {
  const { nome } = useProfile();
  const [lista, setLista] = useState(() => pendencias.filter((p) => p.obraId === obra.id));
  const [selected, setSelected] = useState<Pendencia | null>(null);

  function resolver(id: string, dados: { observacao: string; fotos: number }) {
    const alvo = pendencias.find((p) => p.id === id);
    if (!alvo) return;
    alvo.status = "resolvido";
    alvo.resolucao = { observacao: dados.observacao, fotos: dados.fotos, resolvidoPor: nome, resolvidoEm: agora() };
    setLista(pendencias.filter((p) => p.obraId === obra.id));
    setSelected(null);
  }

  if (lista.length === 0) {
    return <EmptyState icon={<ListChecks className="h-6 w-6" />} title="Nenhuma pendência" description="Esta obra não possui pendências abertas no momento." />;
  }

  return (
    <div className="space-y-3">
      {lista.map((p) => (
        <Card key={p.id} hoverable onClick={() => setSelected(p)} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
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

      <PendenciaDrawer key={selected?.id ?? "none"} pendencia={selected} obraNome={obra.nome} onClose={() => setSelected(null)} onResolver={resolver} />
    </div>
  );
}
