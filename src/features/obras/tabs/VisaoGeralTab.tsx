import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import {
  chartAxisProps,
  chartColors,
  chartGridProps,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
} from "@/components/charts/chartTheme";
import { TrendingUp, DollarSign, CalendarClock, Users, ShieldAlert, ListTodo, FileClock } from "lucide-react";
import type { Obra } from "@/types";
import { getRdosByObra } from "@/mocks/rdos";
import { getNcsByObra } from "@/mocks/ncs";

const planejadoRealizado = [
  { semana: "S1", planejado: 8, realizado: 8 },
  { semana: "S2", planejado: 18, realizado: 16 },
  { semana: "S3", planejado: 29, realizado: 25 },
  { semana: "S4", planejado: 41, realizado: 35 },
  { semana: "S5", planejado: 54, realizado: 47 },
  { semana: "S6", planejado: 68, realizado: 61 },
  { semana: "Atual", planejado: 74, realizado: 68 },
];

export function VisaoGeralTab({ obra }: { obra: Obra }) {
  const rdos = getRdosByObra(obra.id);
  const ncs = getNcsByObra(obra.id);

  const atividades = [
    { hora: "17:42", texto: `RDO #${rdos[0]?.numero ?? "137712126"} enviado` },
    { hora: "16:20", texto: "4 novas evidências adicionadas" },
    { hora: "14:32", texto: `NC-018 criada` },
    { hora: "11:05", texto: "Cronograma atualizado" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Progresso físico" value={`${obra.progresso}%`} icon={<TrendingUp className="h-4 w-4" />} tone="brand" />
        <StatCard label="Progresso financeiro" value={`${obra.progressoFinanceiro}%`} icon={<DollarSign className="h-4 w-4" />} />
        <StatCard label="Dias restantes" value={obra.diasRestantes} icon={<CalendarClock className="h-4 w-4" />} />
        <StatCard label="Equipe hoje" value={`${obra.equipeHoje} pessoas`} icon={<Users className="h-4 w-4" />} />
        <StatCard label="NCs abertas" value={ncs.filter((n) => n.status !== "resolvida").length} icon={<ShieldAlert className="h-4 w-4" />} tone="warn" />
        <StatCard label="Pendências" value={obra.pendencias} icon={<ListTodo className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Planejado x Realizado" subtitle="Progresso físico acumulado (%)" />
          <CardBody>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={planejadoRealizado} margin={{ left: -20, top: 8 }}>
                  <defs>
                    <linearGradient id="gradPlanejado2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartColors.muted} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={chartColors.muted} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradRealizado2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartColors.emerald} stopOpacity={0.45} />
                      <stop offset="100%" stopColor={chartColors.emerald} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="semana" {...chartAxisProps} />
                  <YAxis {...chartAxisProps} width={32} />
                  <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  <Area type="monotone" dataKey="planejado" name="Planejado" stroke={chartColors.muted} strokeWidth={2} fill="url(#gradPlanejado2)" />
                  <Area type="monotone" dataKey="realizado" name="Realizado" stroke={chartColors.emerald} strokeWidth={2.5} fill="url(#gradRealizado2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Últimas atividades" subtitle="Linha do tempo da operação" />
          <CardBody>
            <div className="relative space-y-5 pl-5">
              <div className="absolute bottom-1 left-[5px] top-1 w-px bg-ink/[0.08]" />
              {atividades.map((a, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full border-2 border-navy-800 bg-emerald-400" />
                  <p className="text-[12px] text-slate-500">{a.hora}</p>
                  <p className="mt-0.5 text-[13px] text-slate-200">{a.texto}</p>
                </div>
              ))}
              <div className="relative">
                <span className="absolute -left-5 top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full border-2 border-navy-800 bg-slate-600">
                  <FileClock className="h-full w-full opacity-0" />
                </span>
                <p className="text-[12px] text-slate-600">Início da obra</p>
                <p className="mt-0.5 text-[13px] text-slate-400">{obra.inicio}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
