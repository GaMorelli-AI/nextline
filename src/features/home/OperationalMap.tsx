import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, X } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge, statusLabel } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { pinsMapa } from "@/mocks/mapa";
import { cn } from "@/lib/utils";

const statusDot: Record<string, string> = {
  ok: "bg-[var(--color-status-ok)]",
  atencao: "bg-[var(--color-status-warn)]",
  critico: "bg-[var(--color-status-critical)]",
};

const statusRing: Record<string, string> = {
  ok: "ring-[var(--color-status-ok)]/25",
  atencao: "ring-[var(--color-status-warn)]/25",
  critico: "ring-[var(--color-status-critical)]/25",
};

const statusToTone: Record<string, "ok" | "warn" | "critical"> = {
  ok: "ok",
  atencao: "warn",
  critico: "critical",
};

export function OperationalMap() {
  const [selected, setSelected] = useState<string | null>(pinsMapa[0]?.id ?? null);
  const navigate = useNavigate();
  const pin = pinsMapa.find((p) => p.id === selected);

  return (
    <Card>
      <CardHeader
        title="Mapa Operacional"
        subtitle="Distribuição geográfica de obras e unidades monitoradas"
        action={
          <div className="flex items-center gap-3 text-[11.5px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--color-status-ok)]" /> Normal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--color-status-warn)]" /> Atenção
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--color-status-critical)]" /> Crítico
            </span>
          </div>
        }
      />
      <div className="relative mx-5 mb-5 mt-4 h-[420px] overflow-hidden rounded-[var(--radius-lg)] border border-ink/[0.07]">
        {/* Blueprint background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(52,224,161,0.08), transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(52,201,232,0.08), transparent 55%), var(--color-navy-900)",
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.35]">
          <defs>
            <pattern id="grid-map" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(135,148,172,0.15)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-map)" />
        </svg>

        {/* Pins */}
        {pinsMapa.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span
              className={cn(
                "relative flex h-4 w-4 items-center justify-center rounded-full ring-4 transition-transform hover:scale-125",
                statusDot[p.status],
                statusRing[p.status],
                selected === p.id && "scale-125"
              )}
            >
              {p.status === "critico" && (
                <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75 pulse-dot", statusDot[p.status])} />
              )}
            </span>
          </button>
        ))}

        {/* Selected pin card */}
        {pin && (
          <div className="absolute bottom-4 left-4 w-[280px] animate-fade-in-up rounded-[var(--radius-lg)] border border-ink/10 bg-navy-800/95 p-4 shadow-[var(--shadow-elevated)] backdrop-blur">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <p className="text-[13.5px] font-semibold text-slate-100">{pin.nome}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-200">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2.5">
              <Badge tone={statusToTone[pin.status]}>{statusLabel(pin.status === "ok" ? "ok" : pin.status)}</Badge>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-[11.5px] text-slate-500">
                <span>Progresso</span>
                <span className="text-slate-300">{pin.progresso}%</span>
              </div>
              <ProgressBar value={pin.progresso} tone={statusToTone[pin.status] === "ok" ? "ok" : statusToTone[pin.status] === "warn" ? "warn" : "critical"} size="sm" />
            </div>
            <dl className="mt-3 space-y-1.5 text-[12.5px]">
              <div className="flex justify-between">
                <dt className="text-slate-500">Responsável</dt>
                <dd className="text-slate-300">{pin.responsavel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Última atualização</dt>
                <dd className="text-slate-300">{pin.ultimaAtualizacao}</dd>
              </div>
            </dl>
            {pin.tipo === "obra" && (
              <button
                onClick={() => navigate(`/obras/${pin.id}`)}
                className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-sm)] border border-ink/10 py-2 text-[12.5px] font-medium text-emerald-400 transition-colors hover:bg-ink/[0.05]"
              >
                Ver detalhes da obra <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
