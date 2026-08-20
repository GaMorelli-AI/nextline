import { PageHeader } from "@/components/ui/PageHeader";
import { ExecutiveStats } from "@/features/home/ExecutiveStats";
import { ChartsSection } from "@/features/home/ChartsSection";
import { OperationalMap } from "@/features/home/OperationalMap";
import { AttentionSection } from "@/features/home/AttentionSection";

export function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="NextLine · Kingline Engenharia"
        title="Central de Operações"
        subtitle="Visão consolidada da operação patrimonial e de engenharia."
      />
      <ExecutiveStats />
      <AttentionSection />
      <OperationalMap />
      <ChartsSection />
    </div>
  );
}
