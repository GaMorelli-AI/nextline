import { useState, type ReactNode } from "react";
import { Sparkles, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { gruposCotacao, pedidosFechados } from "@/mocks/demoObra";
import { fornecedores } from "@/mocks/fornecedores";
import { getObraById } from "@/mocks/obras";
import { formatCurrency } from "@/lib/utils";
import type { GrupoCotacao } from "@/types";

const fluxo = ["Necessidade", "Orçamento", "Cotações", "Aprovação", "Pedido Fechado", "Medição", "Produção", "Entrega", "Instalação", "Conferência"];

export function ComprasPage() {
  const [tab, setTab] = useState("cotacoes");
  const [comparando, setComparando] = useState<GrupoCotacao | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Compras e Fornecedores"
        title="Compras e Fornecedores"
        subtitle="Da necessidade à conferência: cotações, aprovações, pedidos e desempenho de fornecedores."
      />

      <Card className="overflow-x-auto p-5">
        <div className="flex min-w-[720px] items-center">
          {fluxo.map((etapa, i) => (
            <div key={etapa} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-blue/30 bg-gradient-brand-soft text-[11px] font-semibold text-brand-blue">
                  {i + 1}
                </div>
                <span className="max-w-[76px] text-center text-[10.5px] leading-tight text-slate-500">{etapa}</span>
              </div>
              {i < fluxo.length - 1 && <div className="mx-1 h-0.5 flex-1 rounded-full bg-ink/10" />}
            </div>
          ))}
        </div>
      </Card>

      <Tabs
        tabs={[
          { key: "cotacoes", label: "Cotações", count: gruposCotacao.length },
          { key: "pedidos", label: "Pedidos Fechados", count: pedidosFechados.length },
          { key: "fornecedores", label: "Fornecedores", count: fornecedores.length },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "cotacoes" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {gruposCotacao.map((grupo) => {
            const menorPreco = [...grupo.cotacoes].sort((a, b) => a.valor - b.valor)[0];
            const menorPrazo = [...grupo.cotacoes].sort((a, b) => a.prazoDiasUteis - b.prazoDiasUteis)[0];
            return (
              <Card key={grupo.id}>
                <CardHeader
                  title={grupo.itemNome.toUpperCase()}
                  subtitle={`${grupo.ambiente} · ${getObraById(grupo.obraId)?.nome}`}
                  action={<Badge tone={grupo.status === "fechado" ? "ok" : "warn"}>{grupo.status === "fechado" ? "Fechado" : grupo.status === "aprovacao-cliente" ? "Aguardando cliente" : "Cotando"}</Badge>}
                />
                <CardBody className="space-y-3">
                  {grupo.cotacoes.map((c, i) => (
                    <div
                      key={c.fornecedor}
                      className={`flex items-center justify-between rounded-[var(--radius-md)] border p-3.5 ${
                        grupo.escolhida === c.fornecedor ? "border-[var(--color-status-ok)]/30 bg-[var(--color-status-ok-bg)]" : "border-ink/10 bg-ink/[0.03]"
                      }`}
                    >
                      <div>
                        <p className="text-[13px] font-semibold text-slate-100">
                          Cotação {String.fromCharCode(65 + i)} · {c.fornecedor}
                        </p>
                        <p className="text-[11.5px] text-slate-500">{c.prazoDiasUteis} dias úteis</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-semibold text-slate-100">{formatCurrency(c.valor)}</p>
                        {grupo.escolhida === c.fornecedor && <Badge tone="ok">Escolhida</Badge>}
                      </div>
                    </div>
                  ))}

                  {grupo.status !== "fechado" && (
                    <Button variant="primary" className="w-full justify-center" icon={<Sparkles className="h-4 w-4" />} onClick={() => setComparando(grupo)}>
                      COMPARAR COM NEXT AI
                    </Button>
                  )}

                  {grupo.id === "cot-vidracaria-box" && (
                    <div className="rounded-[var(--radius-md)] border border-[var(--color-status-warn)]/25 bg-[var(--color-status-warn-bg)] p-3.5">
                      <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--color-status-warn)]">
                        <Clock className="h-3.5 w-3.5" /> Prazo de compra
                      </p>
                      <dl className="mt-2 grid grid-cols-2 gap-2 text-[12px] text-slate-300">
                        <div>
                          <dt className="text-slate-500">Instalação necessária</dt>
                          <dd>{grupo.dataInstalacaoNecessaria}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">Produção (pior caso)</dt>
                          <dd>{menorPrazo.prazoDiasUteis === menorPreco.prazoDiasUteis ? menorPreco.prazoDiasUteis : Math.max(...grupo.cotacoes.map((c) => c.prazoDiasUteis))} dias úteis</dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">Medição</dt>
                          <dd>{grupo.prazoMedicaoDias} dias</dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">Data limite recomendada</dt>
                          <dd className="font-semibold text-slate-100">01/09/2026</dd>
                        </div>
                      </dl>
                      <p className="mt-2 text-[12.5px] font-medium text-[var(--color-status-critical)]">
                        Esta decisão pode impactar o cronograma — feche a compra o quanto antes.
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "pedidos" && (
        <Card>
          <CardBody className="p-0">
            <Table>
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Fornecedor</Th>
                  <Th>Valor</Th>
                  <Th>Fechamento</Th>
                  <Th>Instalação prevista</Th>
                  <Th>Projeto relacionado</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pedidosFechados.map((p) => (
                  <Tr key={p.id}>
                    <Td className="font-medium text-slate-100">{p.itemNome}</Td>
                    <Td>{p.fornecedor}</Td>
                    <Td>{formatCurrency(p.valor)}</Td>
                    <Td className="whitespace-nowrap">{p.dataFechamento}</Td>
                    <Td className="whitespace-nowrap">{p.dataInstalacaoPrevista}</Td>
                    <Td className="max-w-xs truncate text-[12px] text-slate-400">{p.projetoRelacionado}</Td>
                    <Td>
                      <Badge tone="info">{p.status}</Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === "fornecedores" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fornecedores.map((f) => (
            <Card key={f.id} className="p-5">
              <p className="text-[14px] font-semibold text-slate-100">{f.nome}</p>
              <p className="text-[12px] text-slate-500">{f.especialidade}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                <div>
                  <p className="text-slate-500">Performance</p>
                  <p className="font-semibold text-slate-100">{f.performance}%</p>
                </div>
                <div>
                  <p className="text-slate-500">Ocorrências</p>
                  <p className="font-semibold text-slate-100">{f.ocorrencias}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!comparando} onClose={() => setComparando(null)} title="Comparação Next AI" size="md">
        {comparando && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] bg-gradient-brand-soft p-4">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-brand-blue">
                <Sparkles className="h-4 w-4" /> Análise das {comparando.cotacoes.length} propostas
              </p>
            </div>
            <div className="space-y-2.5 text-[13px]">
              <ResultRow icon={<CheckCircle2 className="h-4 w-4 text-[var(--color-status-ok)]" />} label="Melhor preço" value={[...comparando.cotacoes].sort((a, b) => a.valor - b.valor)[0].fornecedor} />
              <ResultRow icon={<CheckCircle2 className="h-4 w-4 text-[var(--color-status-ok)]" />} label="Melhor prazo" value={[...comparando.cotacoes].sort((a, b) => a.prazoDiasUteis - b.prazoDiasUteis)[0].fornecedor} />
              <ResultRow icon={<CheckCircle2 className="h-4 w-4 text-brand-blue" />} label="Melhor equilíbrio" value={comparando.cotacoes[0].fornecedor} />
            </div>
            <div className="flex items-start gap-2 rounded-[var(--radius-md)] border border-[var(--color-status-warn)]/25 bg-[var(--color-status-warn-bg)] p-3.5 text-[12.5px] text-slate-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-status-warn)]" />
              <span>
                Atenção: {[...comparando.cotacoes].sort((a, b) => a.valor - b.valor)[0].fornecedor} não atende ao milestone atual considerando o prazo de produção informado.
              </span>
            </div>
            <p className="text-[11.5px] text-slate-500">A decisão final continua sendo humana — a NextLine apenas organiza os critérios.</p>
            <Button variant="primary" className="w-full justify-center" onClick={() => setComparando(null)}>
              Entendi
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

function ResultRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5">
      <span className="flex items-center gap-2 text-slate-400">
        {icon} {label}
      </span>
      <span className="font-semibold text-slate-100">{value}</span>
    </div>
  );
}
