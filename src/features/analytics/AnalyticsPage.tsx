import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ZAxis,
} from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";
import { MiniChartCard } from "@/components/ui/MiniChartCard";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  chartAxisProps,
  chartColors,
  chartGridProps,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
} from "@/components/charts/chartTheme";
import { custosMensais, performanceFornecedores, riscosOperacionais, tendenciaSla, evolucaoObras } from "@/mocks/analytics";
import { obras } from "@/mocks/obras";
import { TrendingUp, DollarSign, ShieldAlert, Percent, LineChart as LineChartIcon, Gauge, CalendarClock } from "lucide-react";

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={<Breadcrumb items={[{ label: "Ecossistema NextLine" }, { label: "Analytics" }]} />}
        title="Analytics"
        subtitle="Acompanhe custos, cronograma, performance de fornecedores e riscos da operação."
      />

      {/* Mini chart summary cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <MiniChartCard
          title="Evolução das Obras"
          subtitle="Progresso médio realizado no trimestre"
          data={evolucaoObras}
          dataKey="realizado"
          icon={<LineChartIcon className="h-4 w-4 text-emerald-400" />}
          tone="emerald"
          footer="atualizado hoje, 09:00"
        />
        <MiniChartCard
          title="Custos"
          subtitle="Realizado mensal (R$ milhões)"
          data={custosMensais}
          dataKey="realizado"
          icon={<DollarSign className="h-4 w-4 text-teal-400" />}
          tone="teal"
          footer="fechamento em 4 dias"
        />
        <MiniChartCard
          title="SLA de Atendimento"
          subtitle="Tendência dos últimos 6 meses"
          data={tendenciaSla}
          dataKey="sla"
          icon={<Gauge className="h-4 w-4 text-cyan-400" />}
          tone="cyan"
          footer="atualizado há 2 horas"
        />
      </div>

      {/* KPI cards with floating icon badge */}
      <div className="grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={<DollarSign className="h-6 w-6" />}
          iconTone="emerald"
          label="Custo Realizado (Mar)"
          value="R$ 6,0 mi"
          trend="down"
          trendValue="3,2%"
          trendLabel="abaixo do previsto"
        />
        <KpiCard
          icon={<Percent className="h-6 w-6" />}
          iconTone="teal"
          label="SLA Médio"
          value="94,8%"
          trend="up"
          trendValue="0,8 p.p."
          trendLabel="que o mês anterior"
        />
        <KpiCard
          icon={<TrendingUp className="h-6 w-6" />}
          iconTone="cyan"
          label="Aderência ao Cronograma"
          value="88,2%"
          trend="up"
          trendValue="1,4 p.p."
          trendLabel="que o trimestre anterior"
        />
        <KpiCard
          icon={<ShieldAlert className="h-6 w-6" />}
          iconTone="warn"
          label="Riscos Ativos"
          value="5"
          trendLabel="2 de alta severidade"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Custos" subtitle="Previsto x Realizado (R$ milhões)" />
          <CardBody>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={custosMensais} margin={{ left: -10, top: 8 }}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="mes" {...chartAxisProps} />
                  <YAxis {...chartAxisProps} width={32} />
                  <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  <Line type="monotone" dataKey="previsto" name="Previsto" stroke={chartColors.muted} strokeWidth={2} strokeDasharray="4 4" dot={false} />
                  <Line type="monotone" dataKey="realizado" name="Realizado" stroke={chartColors.cyan} strokeWidth={2.5} dot={{ r: 3, fill: chartColors.cyan }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Tendência de SLA" subtitle="Últimos 6 meses" />
          <CardBody>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tendenciaSla} margin={{ left: -10, top: 8 }}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="mes" {...chartAxisProps} />
                  <YAxis {...chartAxisProps} width={38} domain={[85, 100]} />
                  <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  <Line type="monotone" dataKey="sla" name="SLA (%)" stroke={chartColors.emerald} strokeWidth={2.5} dot={{ r: 3, fill: chartColors.emerald }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Performance de Fornecedores" subtitle="Índice consolidado por fornecedor" />
          <CardBody>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceFornecedores} layout="vertical" margin={{ left: 8, top: 8 }}>
                  <CartesianGrid {...chartGridProps} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} {...chartAxisProps} />
                  <YAxis type="category" dataKey="nome" {...chartAxisProps} width={130} />
                  <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="performance" fill={chartColors.teal} radius={[0, 6, 6, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Matriz de Riscos Operacionais" subtitle="Probabilidade x Impacto" />
          <CardBody>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ left: 0, top: 8, right: 16, bottom: 0 }}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis type="number" dataKey="probabilidade" name="Probabilidade" domain={[0, 100]} {...chartAxisProps} label={{ value: "Probabilidade", position: "insideBottom", offset: -4, fill: chartColors.axis, fontSize: 11 }} />
                  <YAxis type="number" dataKey="impacto" name="Impacto" domain={[0, 100]} {...chartAxisProps} label={{ value: "Impacto", angle: -90, position: "insideLeft", fill: chartColors.axis, fontSize: 11 }} />
                  <ZAxis range={[120, 120]} />
                  <ReferenceLine x={50} stroke="rgba(135,148,172,0.2)" />
                  <ReferenceLine y={50} stroke="rgba(135,148,172,0.2)" />
                  <Tooltip
                    contentStyle={tooltipContentStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [`${value}`, `${name}`]}
                    labelFormatter={() => ""}
                  />
                  <Scatter data={riscosOperacionais} fill={chartColors.critical} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-500">
              {riscosOperacionais.map((r) => (
                <span key={r.risco}>{r.risco}</span>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Desempenho por Obra"
          subtitle="Progresso físico, financeiro e desvio orçamentário consolidados"
          action={<CalendarClock className="h-4 w-4 text-slate-500" />}
        />
        <CardBody className="p-0">
          <Table>
            <Thead>
              <Tr>
                <Th>Obra</Th>
                <Th>Progresso Físico</Th>
                <Th>Progresso Financeiro</Th>
                <Th>Desvio</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {obras.slice(0, 8).map((o) => {
                const desvio = o.progresso - o.progressoFinanceiro;
                return (
                  <Tr key={o.id}>
                    <Td className="font-medium text-slate-100">{o.nome}</Td>
                    <Td className="w-40">
                      <ProgressBar value={o.progresso} showLabel size="sm" />
                    </Td>
                    <Td className="w-40">
                      <ProgressBar value={o.progressoFinanceiro} showLabel size="sm" tone="brand" />
                    </Td>
                    <Td>
                      <span className={desvio > 5 ? "text-[var(--color-status-warn)]" : "text-slate-400"}>
                        {desvio > 0 ? `+${desvio} p.p.` : `${desvio} p.p.`}
                      </span>
                    </Td>
                    <Td>
                      <Badge tone={statusToTone(o.status)}>{statusLabel(o.status)}</Badge>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
