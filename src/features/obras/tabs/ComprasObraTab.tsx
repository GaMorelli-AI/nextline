import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SegmentedControl } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { gruposCotacao, pedidosFechados, aprovacoesCliente } from "@/mocks/demoObra";
import { FornecedoresObraTab } from "@/features/obras/tabs/FornecedoresObraTab";
import { MedicoesTab } from "@/features/obras/tabs/MedicoesTab";
import { formatCurrency } from "@/lib/utils";
import type { GrupoCotacao, Obra } from "@/types";
import { ShoppingCart } from "lucide-react";

export function ComprasObraTab({ obra }: { obra: Obra }) {
  const [view, setView] = useState("cotacoes");
  const [comparando, setComparando] = useState<GrupoCotacao | null>(null);

  const cotacoes = gruposCotacao.filter((g) => g.obraId === obra.id);
  const pedidos = pedidosFechados.filter((p) => p.obraId === obra.id);
  const aprovacoes = aprovacoesCliente.filter((a) => a.obraId === obra.id);

  return (
    <div className="space-y-5">
      <SegmentedControl
        options={[
          { key: "cotacoes", label: "Cotações e Pedidos" },
          { key: "aprovacoes", label: "Aprovações do Cliente" },
          { key: "fornecedores", label: "Fornecedores" },
          { key: "medicoes", label: "Medições" },
        ]}
        active={view}
        onChange={setView}
      />

      {view === "cotacoes" &&
        (cotacoes.length === 0 && pedidos.length === 0 ? (
          <EmptyState icon={<ShoppingCart className="h-6 w-6" />} title="Sem compras registradas" description="Esta obra ainda não possui cotações ou pedidos no protótipo." />
        ) : (
          <div className="space-y-4">
            {cotacoes.map((grupo) => (
              <Card key={grupo.id}>
                <CardHeader title={grupo.itemNome} subtitle={grupo.ambiente} action={<Badge tone={grupo.status === "fechado" ? "ok" : "warn"}>{grupo.status === "fechado" ? "Fechado" : "Em cotação"}</Badge>} />
                <CardBody className="space-y-2.5">
                  {grupo.cotacoes.map((c) => (
                    <div key={c.fornecedor} className="flex items-center justify-between rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] p-3">
                      <span className="text-[13px] text-slate-200">{c.fornecedor}</span>
                      <span className="text-[13px] font-semibold text-slate-100">{formatCurrency(c.valor)} · {c.prazoDiasUteis}d</span>
                    </div>
                  ))}
                  {grupo.status !== "fechado" && (
                    <Button variant="outline" size="sm" icon={<Sparkles className="h-3.5 w-3.5" />} onClick={() => setComparando(grupo)}>
                      Comparar com Next AI
                    </Button>
                  )}
                </CardBody>
              </Card>
            ))}
            {pedidos.map((p) => (
              <Card key={p.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13.5px] font-semibold text-slate-100">{p.itemNome}</p>
                    <p className="text-[11.5px] text-slate-500">{p.fornecedor} · {p.projetoRelacionado}</p>
                  </div>
                  <Badge tone="info">Pedido fechado</Badge>
                </div>
              </Card>
            ))}
          </div>
        ))}

      {view === "aprovacoes" &&
        (aprovacoes.length === 0 ? (
          <EmptyState icon={<ShoppingCart className="h-6 w-6" />} title="Sem aprovações pendentes" description="Nenhuma aprovação de cliente registrada." />
        ) : (
          <div className="space-y-3">
            {aprovacoes.map((a) => (
              <Card key={a.id} className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-[13.5px] font-semibold text-slate-100">{a.titulo}</p>
                    <p className="text-[11.5px] text-slate-500">{a.ambiente} · {a.propostas} propostas · prazo {a.prazo}</p>
                  </div>
                  <Badge tone={a.status === "aprovado" ? "ok" : "warn"}>{a.status === "aprovado" ? "Aprovado" : "Aguardando"}</Badge>
                </div>
                {a.status === "aprovado" && a.atrasoDias ? (
                  <p className="mt-2 text-[12.5px] font-medium text-[var(--color-status-warn)]">
                    Aprovação realizada com {a.atrasoDias} dias de atraso — impacto potencial de +{a.atrasoDias} dias.
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        ))}

      {view === "fornecedores" && <FornecedoresObraTab obra={obra} />}
      {view === "medicoes" && <MedicoesTab obra={obra} />}

      <Modal open={!!comparando} onClose={() => setComparando(null)} title="Comparação Next AI" size="sm">
        {comparando && (
          <div className="space-y-3 text-[13px]">
            <p className="flex items-center gap-2 font-semibold text-brand-blue">
              <Sparkles className="h-4 w-4" /> Melhor preço: {[...comparando.cotacoes].sort((a, b) => a.valor - b.valor)[0].fornecedor}
            </p>
            <p>Melhor prazo: {[...comparando.cotacoes].sort((a, b) => a.prazoDiasUteis - b.prazoDiasUteis)[0].fornecedor}</p>
            <p className="text-slate-500">A decisão final continua sendo humana.</p>
            <Button variant="primary" className="w-full justify-center" onClick={() => setComparando(null)}>
              Entendi
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
