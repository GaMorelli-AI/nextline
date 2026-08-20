import { HardHat, Landmark, Boxes, AlertTriangle, Gauge, ShieldAlert } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

export function ExecutiveStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        label="Obras Ativas"
        value="12"
        hint="2 concluídas no trimestre"
        icon={<HardHat className="h-4 w-4" />}
        tone="brand"
      />
      <StatCard
        label="Patrimônio Gerenciado"
        value="R$ 487,2 mi"
        trend="up"
        trendLabel="3,2%"
        hint="vs. trimestre anterior"
        icon={<Landmark className="h-4 w-4" />}
      />
      <StatCard
        label="Ativos Monitorados"
        value="18.429"
        hint="em 47 unidades"
        icon={<Boxes className="h-4 w-4" />}
      />
      <StatCard
        label="Pendências Críticas"
        value="23"
        trend="down"
        trendLabel="4"
        hint="na última semana"
        icon={<AlertTriangle className="h-4 w-4" />}
        tone="warn"
      />
      <StatCard
        label="SLA"
        value="94,8%"
        trend="up"
        trendLabel="0,8 p.p."
        icon={<Gauge className="h-4 w-4" />}
        tone="brand"
      />
      <StatCard
        label="Não Conformidades"
        value="17 abertas"
        hint="6 com prazo vencido"
        icon={<ShieldAlert className="h-4 w-4" />}
        tone="critical"
      />
    </div>
  );
}
