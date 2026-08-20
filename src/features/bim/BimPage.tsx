import { useState } from "react";
import { Box, Layers, FileText, Wrench, RotateCw, ZoomIn, Move3d } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { elementosBIM } from "@/mocks/bim";
import { cn } from "@/lib/utils";

const camadas = ["Estrutura", "Arquitetura", "Elétrica", "Hidráulica", "Climatização", "Transporte Vertical"];

export function BimPage() {
  const [selected, setSelected] = useState(elementosBIM[0]);
  const [ativas, setAtivas] = useState<string[]>(camadas);

  function toggleCamada(c: string) {
    setAtivas((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ecossistema NextLine"
        title="BIM & Digital Twin"
        subtitle="Modelo digital conectado ao patrimônio, manutenção e documentação."
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
        <Card className="relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink/[0.07] px-5 py-4">
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4 text-emerald-400" />
              <p className="text-[13.5px] font-semibold text-slate-100">Centro Administrativo — Bloco D</p>
            </div>
            <div className="flex items-center gap-1.5">
              <IconBtn icon={RotateCw} />
              <IconBtn icon={ZoomIn} />
              <IconBtn icon={Move3d} />
            </div>
          </div>

          <div className="relative h-[480px]" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(52,224,161,0.06), transparent 60%), var(--color-navy-900)" }}>
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full opacity-[0.9]">
              <defs>
                <linearGradient id="bim-edge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34e0a1" />
                  <stop offset="100%" stopColor="#34c9e8" />
                </linearGradient>
                <pattern id="bim-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(135,148,172,0.1)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#bim-grid)" />

              {/* Isometric building wireframe */}
              <g stroke="rgba(169,181,201,0.55)" strokeWidth="1.2" fill="none">
                {/* base */}
                <polygon points="80,260 200,200 320,260 200,320" />
                {/* verticals */}
                <line x1="80" y1="260" x2="80" y2="140" />
                <line x1="200" y1="200" x2="200" y2="80" />
                <line x1="320" y1="260" x2="320" y2="140" />
                <line x1="200" y1="320" x2="200" y2="200" />
                {/* top */}
                <polygon points="80,140 200,80 320,140 200,200" stroke="url(#bim-edge)" strokeWidth="1.6" />
                {/* floor divisions */}
                <line x1="80" y1="200" x2="200" y2="260" opacity="0.5" />
                <line x1="200" y1="260" x2="320" y2="200" opacity="0.5" />
                <line x1="80" y1="170" x2="200" y2="230" opacity="0.35" />
                <line x1="200" y1="230" x2="320" y2="170" opacity="0.35" />
              </g>
            </svg>

            {elementosBIM.map((el) => (
              <button
                key={el.id}
                onClick={() => setSelected(el)}
                style={{ left: `${el.x}%`, top: `${el.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className={cn(
                    "relative flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 transition-transform hover:scale-125",
                    el.status === "critico"
                      ? "bg-[var(--color-status-critical)] ring-[var(--color-status-critical)]/25"
                      : el.status === "manutencao"
                      ? "bg-[var(--color-status-warn)] ring-[var(--color-status-warn)]/25"
                      : "bg-[var(--color-status-ok)] ring-[var(--color-status-ok)]/25",
                    selected.id === el.id && "scale-125 ring-8"
                  )}
                />
                <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-slate-200">
                  {el.id}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-ink/[0.07] px-5 py-3.5">
            <Layers className="h-3.5 w-3.5 text-slate-500" />
            {camadas.map((c) => (
              <button
                key={c}
                onClick={() => toggleCamada(c)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11.5px] transition-colors",
                  ativas.includes(c)
                    ? "border-emerald-400/30 bg-gradient-brand-soft text-emerald-300"
                    : "border-ink/10 text-slate-500 hover:text-slate-300"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-500">Elemento selecionado</p>
          <h3 className="mt-1 text-[18px] font-semibold text-slate-50">{selected.nome}</h3>
          <div className="mt-2">
            <Badge tone={statusToTone(selected.status)}>{statusLabel(selected.status)}</Badge>
          </div>

          <div className="mt-5 space-y-3 border-t border-ink/[0.07] pt-4">
            <InfoRow label="Tipo" value={selected.tipo} />
            <InfoRow label="Última manutenção" value={selected.ultimaManutencao} />
            <InfoRow label="Próxima manutenção" value={selected.proximaManutencao} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-ink/[0.07] pt-4">
            <Button variant="secondary" size="sm" icon={<FileText className="h-3.5 w-3.5" />} className="justify-center">
              {selected.documentos} docs
            </Button>
            <Button variant="secondary" size="sm" icon={<Wrench className="h-3.5 w-3.5" />} className="justify-center">
              {selected.ordens} ordens
            </Button>
          </div>

          <div className="mt-5 rounded-[var(--radius-md)] bg-gradient-brand-soft p-3.5 text-[12px] leading-relaxed text-emerald-200">
            O Digital Twin conecta este elemento ao seu histórico de manutenção, documentação técnica e ativos patrimoniais em tempo real.
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-200">{value}</span>
    </div>
  );
}

function IconBtn({ icon: Icon }: { icon: typeof RotateCw }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-xs)] text-slate-400 transition-colors hover:bg-ink/[0.06] hover:text-slate-100">
      <Icon className="h-4 w-4" />
    </button>
  );
}
