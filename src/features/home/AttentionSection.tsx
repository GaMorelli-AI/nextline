import { useNavigate } from "react-router-dom";
import { Clock, UserCheck, FileWarning, Truck, ArrowRight, Radio } from "lucide-react";
import { Card } from "@/components/ui/Card";

const items = [
  {
    icon: Clock,
    tone: "warn" as const,
    title: "Obra Residencial Jardins",
    description: "Milestone de liberação de marcenaria em risco.",
    detail: "Impacto projetado: +8 dias.",
    cta: "Analisar",
    href: "/cronograma?obra=residencial-jardins",
  },
  {
    icon: UserCheck,
    tone: "info" as const,
    title: "Apartamento Moema",
    description: "Cliente está há 5 dias sem aprovar a vidraçaria.",
    detail: "Aprovação pendente desde 05/09.",
    cta: "Cobrar aprovação",
    href: "/obras/apartamento-moema?tab=compras",
  },
  {
    icon: FileWarning,
    tone: "critical" as const,
    title: "Casa Alphaville",
    description: "Liberação da obra expira em 12 dias.",
    detail: "Documento: Liberação da obra.",
    cta: "Ver documento",
    href: "/obras/casa-alphaville?tab=documentos",
  },
  {
    icon: Truck,
    tone: "warn" as const,
    title: "Reforma Corporativa",
    description: "Fornecedor não compareceu à visita prevista hoje.",
    detail: "Automação SmartHome — ocorrência registrada.",
    cta: "Ver ocorrência",
    href: "/obras/reforma-corporativa?tab=agenda",
  },
];

const toneClasses = {
  warn: "bg-[var(--color-status-warn-bg)] text-[var(--color-status-warn)]",
  critical: "bg-[var(--color-status-critical-bg)] text-[var(--color-status-critical)]",
  info: "bg-[var(--color-status-info-bg)] text-[var(--color-status-info)]",
};

export function AttentionSection() {
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75 pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
          </span>
          <h3 className="text-[15px] font-semibold text-slate-50">Requer sua atenção</h3>
        </div>
        <span className="flex items-center gap-1.5 text-[11.5px] text-slate-500">
          <Radio className="h-3.5 w-3.5" /> Monitoramento em tempo real
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.href)}
            className="group flex flex-col items-start rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] p-4 text-left transition-all hover:border-brand-blue/30 hover:bg-ink/[0.05]"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] ${toneClasses[item.tone]}`}>
              <item.icon className="h-4.5 w-4.5" />
            </div>
            <p className="mt-3 text-[13.5px] font-semibold text-slate-100">{item.title}</p>
            <p className="mt-1 text-[12.5px] text-slate-300">{item.description}</p>
            <p className="mt-1 text-[12px] text-slate-500">{item.detail}</p>
            <span className="mt-3.5 flex items-center gap-1.5 text-[12.5px] font-medium text-brand-blue">
              {item.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
