import { useState } from "react";
import { Camera, CheckCircle2, Clock, ImageIcon, User } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { categoriaLabel, statusLabel, statusTone } from "@/features/pendencias/pendenciaMaps";
import type { Pendencia } from "@/types";

export function PendenciaDrawer({
  pendencia,
  obraNome,
  onClose,
  onResolver,
}: {
  pendencia: Pendencia | null;
  obraNome?: string;
  onClose: () => void;
  onResolver: (id: string, dados: { observacao: string; fotos: number }) => void;
}) {
  const [resolvendo, setResolvendo] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [fotos, setFotos] = useState(0);

  function fechar() {
    setResolvendo(false);
    setObservacao("");
    setFotos(0);
    onClose();
  }

  function concluir() {
    if (!pendencia) return;
    onResolver(pendencia.id, { observacao, fotos });
    setResolvendo(false);
    setObservacao("");
    setFotos(0);
  }

  return (
    <Drawer open={!!pendencia} onClose={fechar} title={pendencia?.titulo} subtitle={pendencia ? categoriaLabel[pendencia.categoria] : ""}>
      {pendencia && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[pendencia.status]}>{statusLabel[pendencia.status]}</Badge>
            {pendencia.prazo && <Badge tone="neutral">Prazo: {pendencia.prazo}</Badge>}
          </div>

          <p className="text-[13.5px] leading-relaxed text-slate-300">{pendencia.descricao}</p>

          <div className="grid grid-cols-2 gap-4 text-[13px]">
            {obraNome && (
              <div>
                <p className="text-[11.5px] text-slate-500">Obra</p>
                <p className="mt-0.5 font-medium text-slate-200">{obraNome}</p>
              </div>
            )}
            {pendencia.ambiente && (
              <div>
                <p className="text-[11.5px] text-slate-500">Ambiente</p>
                <p className="mt-0.5 font-medium text-slate-200">{pendencia.ambiente}</p>
              </div>
            )}
            {pendencia.responsavel && (
              <div>
                <p className="text-[11.5px] text-slate-500">Responsável</p>
                <p className="mt-0.5 font-medium text-slate-200">{pendencia.responsavel}</p>
              </div>
            )}
          </div>

          {pendencia.status === "resolvido" && pendencia.resolucao && (
            <div className="space-y-2.5 rounded-[var(--radius-md)] border border-[var(--color-status-ok)]/25 bg-[var(--color-status-ok-bg)] p-4">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-100">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-status-ok)]" /> Pendência resolvida
              </p>
              <p className="flex items-center gap-1.5 text-[12px] text-slate-400">
                <User className="h-3.5 w-3.5" /> {pendencia.resolucao.resolvidoPor}
                <Clock className="ml-2 h-3.5 w-3.5" /> {pendencia.resolucao.resolvidoEm}
              </p>
              {pendencia.resolucao.observacao && <p className="text-[12.5px] text-slate-300">{pendencia.resolucao.observacao}</p>}
              {pendencia.resolucao.fotos > 0 && (
                <p className="text-[11.5px] text-slate-500">{pendencia.resolucao.fotos} evidência(s) anexada(s)</p>
              )}
            </div>
          )}

          {pendencia.status !== "resolvido" && !resolvendo && (
            <Button variant="primary" className="w-full justify-center" icon={<CheckCircle2 className="h-4 w-4" />} onClick={() => setResolvendo(true)}>
              Resolver pendência
            </Button>
          )}

          {pendencia.status !== "resolvido" && resolvendo && (
            <div className="space-y-4 border-t border-ink/[0.07] pt-4">
              <div>
                <p className="mb-1.5 text-[12.5px] font-medium text-slate-400">Observação (opcional)</p>
                <Textarea rows={3} placeholder="O que foi feito para resolver..." value={observacao} onChange={(e) => setObservacao(e.target.value)} />
              </div>

              <button
                onClick={() => setFotos((f) => f + 1)}
                className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-brand-blue/30 py-5 text-[13.5px] font-semibold text-brand-blue transition-colors hover:bg-gradient-brand-soft"
              >
                <Camera className="h-4.5 w-4.5" />
                Anexar evidência {fotos > 0 && `(${fotos})`}
              </button>
              {fotos > 0 && (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {Array.from({ length: fotos }).map((_, i) => (
                    <div key={i} className="flex aspect-square items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-navy-600 to-navy-800">
                      <ImageIcon className="h-5 w-5 text-slate-600" />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[11.5px] text-slate-500">
                Ao concluir, o sistema registra automaticamente quem deu baixa e a data/hora.
              </p>

              <div className="flex gap-2">
                <Button variant="ghost" className="flex-1 justify-center" onClick={() => setResolvendo(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" className="flex-1 justify-center" icon={<CheckCircle2 className="h-4 w-4" />} onClick={concluir}>
                  Concluir
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
}
