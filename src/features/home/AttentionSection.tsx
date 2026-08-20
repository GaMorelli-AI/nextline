import { useNavigate } from "react-router-dom";
import { Clock, ShieldAlert, FileCheck2, ArrowRight, Radio } from "lucide-react";
import { Card } from "@/components/ui/Card";

const items = [
  {
    icon: Clock,
    tone: "warn" as const,
    title: "Obra Sala São Paulo",
    description: "Cronograma com atraso estimado de 6 dias.",
    detail: "Motivo: Instalação de eletrodutos rígidos pendente.",
    cta: "Ver ocorrência",
    href: "/obras/sala-sp?tab=cronograma",
  },
  {
    icon: ShieldAlert,
    tone: "critical" as const,
    title: "Centro Administrativo",
    description: "3 não conformidades vencidas.",
    detail: "Categorias: Segurança, Projeto e Estrutural.",
    cta: "Analisar NCs",
    href: "/obras/centro-administrativo?tab=nao-conformidades",
  },
  {
    icon: FileCheck2,
    tone: "info" as const,
    title: "Contrato 171/2024",
    description: "Medição aguardando aprovação.",
    detail: "Valor de R$ 184.720 — parada na etapa Gestor.",
    cta: "Revisar medição",
    href: "/obras/sala-sp?tab=medicoes",
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
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <h3 className="text-[15px] font-semibold text-slate-50">Requer sua atenção</h3>
        </div>
        <span className="flex items-center gap-1.5 text-[11.5px] text-slate-500">
          <Radio className="h-3.5 w-3.5" /> Monitoramento em tempo real
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.href)}
            className="group flex flex-col items-start rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] p-4 text-left transition-all hover:border-emerald-400/30 hover:bg-ink/[0.05]"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] ${toneClasses[item.tone]}`}>
              <item.icon className="h-4.5 w-4.5" />
            </div>
            <p className="mt-3 text-[13.5px] font-semibold text-slate-100">{item.title}</p>
            <p className="mt-1 text-[12.5px] text-slate-300">{item.description}</p>
            <p className="mt-1 text-[12px] text-slate-500">{item.detail}</p>
            <span className="mt-3.5 flex items-center gap-1.5 text-[12.5px] font-medium text-emerald-400">
              {item.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
