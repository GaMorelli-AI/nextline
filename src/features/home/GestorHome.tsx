import { PageHeader } from "@/components/ui/PageHeader";
import { ExecutiveStats } from "@/features/home/ExecutiveStats";
import { ChartsSection } from "@/features/home/ChartsSection";
import { OperationalMap } from "@/features/home/OperationalMap";
import { AttentionSection } from "@/features/home/AttentionSection";
import { OperacaoResumoSection } from "@/features/home/OperacaoResumoSection";
import { ImpactosTimelineSection } from "@/features/home/ImpactosTimelineSection";

export function GestorHome() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="NextLine · Kingline Engenharia"
        title="Central de Operações"
        subtitle="O que está acontecendo, o que está atrasado e o que exige sua próxima decisão."
      />
      <ExecutiveStats />
      <AttentionSection />
      <OperacaoResumoSection />
      <ImpactosTimelineSection />
      <OperationalMap />
      <ChartsSection />
    </div>
  );
}
