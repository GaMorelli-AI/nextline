import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import {
  chartAxisProps,
  chartColors,
  chartGridProps,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
} from "@/components/charts/chartTheme";
import { saudeObras, evolucaoObras, pendenciasPorCategoria, patrimonioPorUnidade } from "@/mocks/analytics";

export function ChartsSection() {
  const totalObras = saudeObras.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader title="Saúde das Obras" subtitle="Distribuição por status de cronograma" />
        <CardBody>
          <div className="flex items-center gap-6">
            <div className="relative h-[180px] w-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={saudeObras}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={58}
                    outerRadius={82}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {saudeObras.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipContentStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold text-slate-50">{totalObras}</span>
                <span className="text-[11px] text-slate-500">obras</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {saudeObras.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    <span className="text-slate-300">{s.name}</span>
                  </div>
                  <span className="font-semibold text-slate-100">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Evolução das Obras" subtitle="Progresso planejado x realizado (% médio)" />
        <CardBody>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolucaoObras} margin={{ left: -20, top: 8 }}>
                <defs>
                  <linearGradient id="gradPlanejado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColors.muted} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={chartColors.muted} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradRealizado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColors.emerald} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={chartColors.emerald} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...chartGridProps} />
                <XAxis dataKey="mes" {...chartAxisProps} />
                <YAxis {...chartAxisProps} width={32} />
                <Tooltip
                  contentStyle={tooltipContentStyle}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                />
                <Area
                  type="monotone"
                  dataKey="planejado"
                  stroke={chartColors.muted}
                  strokeWidth={2}
                  fill="url(#gradPlanejado)"
                  name="Planejado (%)"
                />
                <Area
                  type="monotone"
                  dataKey="realizado"
                  stroke={chartColors.emerald}
                  strokeWidth={2.5}
                  fill="url(#gradRealizado)"
                  name="Realizado (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Pendências por Categoria" subtitle="Não conformidades e ocorrências abertas" />
        <CardBody>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pendenciasPorCategoria} layout="vertical" margin={{ left: 8, top: 8 }}>
                <CartesianGrid {...chartGridProps} horizontal={false} />
                <XAxis type="number" {...chartAxisProps} />
                <YAxis type="category" dataKey="categoria" {...chartAxisProps} width={92} />
                <Tooltip
                  contentStyle={tooltipContentStyle}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="quantidade" fill={chartColors.teal} radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Patrimônio por Unidade" subtitle="Valor patrimonial em R$ milhões" />
        <CardBody>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patrimonioPorUnidade} margin={{ left: -20, top: 8 }}>
                <CartesianGrid {...chartGridProps} />
                <XAxis dataKey="unidade" {...chartAxisProps} />
                <YAxis {...chartAxisProps} width={32} />
                <Tooltip
                  contentStyle={tooltipContentStyle}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="valor" fill={chartColors.cyan} radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
