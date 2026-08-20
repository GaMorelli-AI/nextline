import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "ok" | "warn" | "critical" | "info" | "neutral" | "brand";

const toneClasses: Record<BadgeTone, string> = {
  ok: "text-[var(--color-status-ok)] bg-[var(--color-status-ok-bg)] border-[var(--color-status-ok)]/25",
  warn: "text-[var(--color-status-warn)] bg-[var(--color-status-warn-bg)] border-[var(--color-status-warn)]/25",
  critical: "text-[var(--color-status-critical)] bg-[var(--color-status-critical-bg)] border-[var(--color-status-critical)]/25",
  info: "text-[var(--color-status-info)] bg-[var(--color-status-info-bg)] border-[var(--color-status-info)]/25",
  neutral: "text-slate-300 bg-ink/5 border-ink/10",
  brand: "text-emerald-300 bg-gradient-brand-soft border-emerald-400/25",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide whitespace-nowrap",
        toneClasses[tone],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function statusToTone(status: string): BadgeTone {
  switch (status) {
    case "no-prazo":
    case "ok":
    case "aprovado":
    case "aprovada":
    case "operacional":
    case "resolvida":
    case "concluido":
    case "ativo":
      return "ok";
    case "atencao":
    case "em-tratamento":
    case "em-revisao":
    case "aguardando":
    case "manutencao":
    case "pendente":
      return "warn";
    case "critico":
    case "aberta":
    case "vencido":
    case "rejeitada":
    case "inativo":
      return "critical";
    default:
      return "neutral";
  }
}

export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    "no-prazo": "No prazo",
    atencao: "Atenção",
    critico: "Crítico",
    concluido: "Concluído",
    ok: "Normal",
    aberta: "Aberta",
    "em-tratamento": "Em tratamento",
    resolvida: "Resolvida",
    "em-revisao": "Em revisão",
    aprovado: "Aprovado",
    aprovada: "Aprovada",
    pendente: "Pendente",
    vencido: "Vencido",
    aguardando: "Aguardando",
    rejeitada: "Rejeitada",
    operacional: "Operacional",
    manutencao: "Manutenção",
    inativo: "Inativo",
    ativo: "Ativo",
    encerrado: "Encerrado",
    suspenso: "Suspenso",
    rascunho: "Rascunho",
  };
  return map[status] ?? status;
}
