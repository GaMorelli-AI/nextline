import { HardHat, CheckCircle2, AlertTriangle, ShieldAlert, TrendingUp, ListChecks, UserCheck, Diamond } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { obras } from "@/mocks/obras";
import { pendencias, milestones, aprovacoesCliente } from "@/mocks/demoObra";
import { naoConformidades } from "@/mocks/ncs";

export function ExecutiveStats() {
  const ativas = obras.filter((o) => o.status !== "concluido");
  const noPrazo = ativas.filter((o) => o.status === "no-prazo").length;
  const emAtencao = ativas.filter((o) => o.status === "atencao").length;
  const criticas = ativas.filter((o) => o.status === "critico").length;
  const mediaAndamento = Math.round(ativas.reduce((acc, o) => acc + o.progresso, 0) / ativas.length);
  const pendenciasAbertas = pendencias.filter((p) => p.status !== "resolvido").length;
  const aprovacoesPendentes = aprovacoesCliente.filter((a) => a.status === "aguardando").length;
  const ncsAbertas = naoConformidades.filter((n) => n.status !== "resolvida").length;
  const milestonesRisco = milestones.filter((m) => m.status === "risco").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
      <StatCard label="Obras Ativas" value={ativas.length} icon={<HardHat className="h-4 w-4" />} tone="brand" />
      <StatCard label="No Prazo" value={noPrazo} icon={<CheckCircle2 className="h-4 w-4" />} />
      <StatCard label="Em Atenção" value={emAtencao} icon={<AlertTriangle className="h-4 w-4" />} tone="warn" />
      <StatCard label="Críticas" value={criticas} icon={<ShieldAlert className="h-4 w-4" />} tone="critical" />
      <StatCard label="Andamento Médio" value={`${mediaAndamento}%`} icon={<TrendingUp className="h-4 w-4" />} tone="brand" />
      <StatCard label="Pendências Abertas" value={pendenciasAbertas} icon={<ListChecks className="h-4 w-4" />} />
      <StatCard label="Aprovações Pendentes" value={aprovacoesPendentes} icon={<UserCheck className="h-4 w-4" />} tone="warn" />
      <StatCard label="Milestones em Risco" value={milestonesRisco} hint={`${ncsAbertas} NCs abertas`} icon={<Diamond className="h-4 w-4" />} tone="critical" />
    </div>
  );
}
