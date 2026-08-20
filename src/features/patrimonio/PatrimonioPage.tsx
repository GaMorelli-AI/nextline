import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Landmark, Boxes, Building2, Gauge } from "lucide-react";
import {
  chartAxisProps,
  chartColors,
  chartGridProps,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
} from "@/components/charts/chartTheme";
import { unidadesPatrimonio, ativosPorCategoria, movimentacoesRecentes } from "@/mocks/patrimonio";
import { formatCurrencyCompact } from "@/lib/utils";

const pieColors = [chartColors.emerald, chartColors.teal, chartColors.cyan, chartColors.info, chartColors.warn, chartColors.muted];

export function PatrimonioPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Gestão Patrimonial"
        title="Gestão Patrimonial"
        subtitle="Visão consolidada do patrimônio físico sob gestão da NextLine."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Patrimônio Total" value="R$ 487,2 mi" icon={<Landmark className="h-4 w-4" />} tone="brand" trend="up" trendLabel="2,1%" />
        <StatCard label="Ativos" value="18.429" icon={<Boxes className="h-4 w-4" />} />
        <StatCard label="Unidades" value="47" icon={<Building2 className="h-4 w-4" />} />
        <StatCard label="Disponibilidade" value="97,4%" icon={<Gauge className="h-4 w-4" />} tone="brand" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader title="Distribuição Patrimonial" subtitle="Valor por unidade (R$ milhões)" />
          <CardBody>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={unidadesPatrimonio.map((u) => ({ nome: u.nome, valor: u.valor / 1_000_000 }))} margin={{ left: -10, top: 8 }}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="nome" {...chartAxisProps} interval={0} angle={-12} textAnchor="end" height={50} />
                  <YAxis {...chartAxisProps} width={36} />
                  <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="valor" fill={chartColors.cyan} radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Ativos por Categoria" subtitle="Distribuição por tipo de ativo" />
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="h-[200px] w-[140px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ativosPorCategoria} dataKey="quantidade" nameKey="categoria" innerRadius={42} outerRadius={68} paddingAngle={2} stroke="none">
                      {ativosPorCategoria.map((c, i) => (
                        <Cell key={c.categoria} fill={pieColors[i % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {ativosPorCategoria.map((c, i) => (
                  <div key={c.categoria} className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: pieColors[i % pieColors.length] }} />
                      <span className="text-slate-300">{c.categoria}</span>
                    </div>
                    <span className="font-medium text-slate-100">{c.quantidade.toLocaleString("pt-BR")}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader title="Localização e Condição dos Ativos" subtitle="Por unidade patrimonial" />
          <CardBody className="space-y-4">
            {unidadesPatrimonio.map((u) => (
              <div key={u.id} className="rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13.5px] font-semibold text-slate-100">{u.nome}</p>
                    <p className="text-[11.5px] text-slate-500">
                      {u.tipo} · {u.cidade}/{u.estado} · {u.area.toLocaleString("pt-BR")} m²
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-semibold text-slate-100">{formatCurrencyCompact(u.valor)}</p>
                    <p className="text-[11px] text-slate-500">{u.ativos.toLocaleString("pt-BR")} ativos</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Condição geral</span>
                    <span className="text-slate-300">{u.condicao}%</span>
                  </div>
                  <ProgressBar value={u.condicao} tone={u.condicao >= 85 ? "ok" : u.condicao >= 75 ? "brand" : "warn"} size="sm" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Movimentações Recentes" subtitle="Últimas ações sobre ativos" />
          <CardBody className="p-0">
            <Table>
              <Thead>
                <Tr>
                  <Th>Ativo</Th>
                  <Th>Tipo</Th>
                  <Th>Data</Th>
                </Tr>
              </Thead>
              <Tbody>
                {movimentacoesRecentes.map((m) => (
                  <Tr key={m.id}>
                    <Td className="font-medium text-slate-100">
                      <p className="max-w-[160px] truncate">{m.ativo}</p>
                      <p className="text-[11px] text-slate-500">{m.unidade}</p>
                    </Td>
                    <Td>{m.tipo}</Td>
                    <Td className="whitespace-nowrap text-slate-400">{m.data}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
