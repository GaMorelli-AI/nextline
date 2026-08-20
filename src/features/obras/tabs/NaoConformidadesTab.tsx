import { useState } from "react";
import { ImageIcon, MessageSquare } from "lucide-react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { getNcsByObra } from "@/mocks/ncs";
import type { NaoConformidade, Obra, Severidade } from "@/types";

const severidadeTone: Record<Severidade, "ok" | "warn" | "critical"> = {
  baixa: "ok",
  media: "warn",
  alta: "critical",
};

const severidadeLabel: Record<Severidade, string> = { baixa: "Baixa", media: "Média", alta: "Alta" };

export function NaoConformidadesTab({ obra }: { obra: Obra }) {
  const ncs = getNcsByObra(obra.id);
  const [selected, setSelected] = useState<NaoConformidade | null>(null);

  return (
    <div className="space-y-4">
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Descrição</Th>
            <Th>Categoria</Th>
            <Th>Responsável</Th>
            <Th>Prazo</Th>
            <Th>Severidade</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ncs.map((nc) => (
            <Tr key={nc.id} onClick={() => setSelected(nc)}>
              <Td className="font-semibold text-slate-100">{nc.id}</Td>
              <Td className="max-w-xs truncate">{nc.descricao}</Td>
              <Td>{nc.categoria}</Td>
              <Td>{nc.responsavel}</Td>
              <Td>{nc.prazo}</Td>
              <Td>
                <Badge tone={severidadeTone[nc.severidade]}>{severidadeLabel[nc.severidade]}</Badge>
              </Td>
              <Td>
                <Badge tone={statusToTone(nc.status)}>{statusLabel(nc.status)}</Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.id}
        subtitle={selected ? `Aberta em ${selected.dataAbertura}` : ""}
      >
        {selected && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={severidadeTone[selected.severidade]}>Severidade {severidadeLabel[selected.severidade]}</Badge>
              <Badge tone={statusToTone(selected.status)}>{statusLabel(selected.status)}</Badge>
              <Badge tone="neutral">{selected.categoria}</Badge>
            </div>

            <div>
              <h4 className="mb-1.5 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">Descrição</h4>
              <p className="text-[13.5px] leading-relaxed text-slate-300">{selected.descricao}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <p className="text-[11.5px] text-slate-500">Responsável</p>
                <p className="mt-0.5 font-medium text-slate-200">{selected.responsavel}</p>
              </div>
              <div>
                <p className="text-[11.5px] text-slate-500">Prazo</p>
                <p className="mt-0.5 font-medium text-slate-200">{selected.prazo}</p>
              </div>
            </div>

            <div>
              <h4 className="mb-2 flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">
                <ImageIcon className="h-3.5 w-3.5" /> Fotos ({selected.fotos})
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: selected.fotos }).map((_, i) => (
                  <div key={i} className="flex aspect-square items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-navy-600 to-navy-800">
                    <ImageIcon className="h-4 w-4 text-slate-600" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">Timeline</h4>
              <div className="relative space-y-4 pl-5">
                <div className="absolute bottom-1 left-[5px] top-1 w-px bg-ink/[0.08]" />
                {selected.timeline.map((t, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full border-2 border-navy-800 bg-emerald-400" />
                    <p className="text-[11.5px] text-slate-500">{t.data}</p>
                    <p className="mt-0.5 text-[13px] text-slate-200">{t.evento}</p>
                  </div>
                ))}
              </div>
            </div>

            {selected.comentarios.length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">
                  <MessageSquare className="h-3.5 w-3.5" /> Comentários
                </h4>
                <div className="space-y-3">
                  {selected.comentarios.map((c, i) => (
                    <div key={i} className="rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[12.5px] font-medium text-slate-200">{c.autor}</p>
                        <p className="text-[11px] text-slate-500">{c.data}</p>
                      </div>
                      <p className="mt-1 text-[13px] text-slate-300">{c.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 border-t border-ink/[0.07] pt-4">
              <Button variant="primary" className="flex-1">
                Registrar ação tomada
              </Button>
              <Button variant="secondary">Encerrar NC</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
