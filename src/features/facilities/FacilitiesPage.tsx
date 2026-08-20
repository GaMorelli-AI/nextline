import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { Wrench, ClipboardList, Gauge, DollarSign } from "lucide-react";
import { chartAxisProps, chartColors, chartGridProps, tooltipContentStyle, tooltipItemStyle, tooltipLabelStyle } from "@/components/charts/chartTheme";
import { ordensServico, custosFacilities } from "@/mocks/facilities";

const prioridadeTone: Record<string, "ok" | "warn" | "critical"> = { baixa: "ok", media: "warn", alta: "critical" };
const prioridadeLabel: Record<string, string> = { baixa: "Baixa", media: "Média", alta: "Alta" };

export function FacilitiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Ecossistema NextLine" title="Facilities" subtitle="Gestão de manutenção, ordens de serviço e disponibilidade operacional." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Ordens Abertas" value={ordensServico.filter((o) => o.status !== "resolvida").length} icon={<ClipboardList className="h-4 w-4" />} tone="warn" />
        <StatCard label="Manutenções Preventivas" value="34" hint="programadas este mês" icon={<Wrench className="h-4 w-4" />} tone="brand" />
        <StatCard label="SLA de Atendimento" value="94,8%" trend="up" trendLabel="0,8 p.p." icon={<Gauge className="h-4 w-4" />} />
        <StatCard label="Custo de Manutenção" value="R$ 120 mil" hint="no mês corrente" icon={<DollarSign className="h-4 w-4" />} />
      </div>

      <Card>
        <CardHeader title="Custos de Manutenção" subtitle="Preventiva x Corretiva (R$ mil/mês)" />
        <CardBody>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={custosFacilities} margin={{ left: -10, top: 8 }}>
                <CartesianGrid {...chartGridProps} />
                <XAxis dataKey="mes" {...chartAxisProps} />
                <YAxis {...chartAxisProps} width={32} />
                <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Legend wrapperStyle={{ fontSize: 12, color: chartColors.axis }} />
                <Bar dataKey="preventiva" name="Preventiva" fill={chartColors.emerald} radius={[6, 6, 0, 0]} barSize={18} />
                <Bar dataKey="corretiva" name="Corretiva" fill={chartColors.critical} radius={[6, 6, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Ordens de Serviço" subtitle="Preventivas e corretivas em andamento" />
        <CardBody className="p-0">
          <Table>
            <Thead>
              <Tr>
                <Th>OS</Th>
                <Th>Ativo</Th>
                <Th>Tipo</Th>
                <Th>Unidade</Th>
                <Th>Prioridade</Th>
                <Th>Responsável</Th>
                <Th>Prazo</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ordensServico.map((os) => (
                <Tr key={os.id}>
                  <Td className="font-semibold text-slate-100">{os.id}</Td>
                  <Td>{os.ativo}</Td>
                  <Td>{os.tipo}</Td>
                  <Td>{os.unidade}</Td>
                  <Td>
                    <Badge tone={prioridadeTone[os.prioridade]}>{prioridadeLabel[os.prioridade]}</Badge>
                  </Td>
                  <Td>{os.responsavel}</Td>
                  <Td className="whitespace-nowrap">{os.prazo}</Td>
                  <Td>
                    <Badge tone={statusToTone(os.status)}>{statusLabel(os.status)}</Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
