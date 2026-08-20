import { useState } from "react";
import { UploadCloud, ImageIcon, PenLine } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, Textarea } from "@/components/ui/Input";

const perguntas = [
  "Os serviços estão dentro do prazo?",
  "Os trabalhadores estão utilizando os EPIs?",
  "Existem condições seguras de trabalho?",
  "Os serviços estão dentro do padrão de qualidade?",
  "Existem alterações de projeto?",
  "Os resíduos estão sendo descartados corretamente?",
];

export function NovoRDOForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [respostas, setRespostas] = useState<Record<string, "sim" | "nao">>({});

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Novo Diário de Obra"
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Salvar rascunho
          </Button>
          <Button variant="primary" onClick={onClose}>
            Enviar RDO
          </Button>
        </>
      }
    >
      <div className="space-y-7">
        <section>
          <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Informações Gerais</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label>Data</Label>
              <Input type="date" defaultValue="2026-03-27" />
            </div>
            <div>
              <Label>Responsável</Label>
              <Select defaultValue="Geovanna Sena">
                <option>Geovanna Sena</option>
                <option>Rafael Tosta</option>
              </Select>
            </div>
            <div>
              <Label>Condições climáticas</Label>
              <Select defaultValue="Bom">
                <option>Bom</option>
                <option>Nublado</option>
                <option>Chuva</option>
              </Select>
            </div>
            <div>
              <Label>Quantidade de colaboradores</Label>
              <Input type="number" defaultValue={9} />
            </div>
            <div>
              <Label>Horas trabalhadas</Label>
              <Input type="number" defaultValue={8} />
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-slate-500">
            Acompanhamento dos Serviços
          </h3>
          <div className="space-y-2.5">
            {perguntas.map((p) => (
              <div
                key={p}
                className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-[13px] text-slate-300">{p}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRespostas((r) => ({ ...r, [p]: "sim" }))}
                    className={`rounded-[var(--radius-xs)] px-3 py-1 text-[12.5px] font-medium transition-colors ${
                      respostas[p] === "sim"
                        ? "bg-[var(--color-status-ok-bg)] text-[var(--color-status-ok)]"
                        : "bg-ink/[0.05] text-slate-400 hover:bg-ink/[0.08]"
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => setRespostas((r) => ({ ...r, [p]: "nao" }))}
                    className={`rounded-[var(--radius-xs)] px-3 py-1 text-[12.5px] font-medium transition-colors ${
                      respostas[p] === "nao"
                        ? "bg-[var(--color-status-critical-bg)] text-[var(--color-status-critical)]"
                        : "bg-ink/[0.05] text-slate-400 hover:bg-ink/[0.08]"
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Serviços executados</h3>
          <Textarea rows={3} placeholder="Descreva os serviços executados no dia..." defaultValue="Continuidade da instalação de eletrodutos rígidos no pavimento 2. Início da montagem do piso elevado técnico na ala leste." />
        </section>

        <section>
          <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Ocorrências</h3>
          <Textarea rows={2} placeholder="Descreva ocorrências relevantes..." defaultValue="Atraso na entrega de material para eletrodutos, impactando cronograma da disciplina elétrica." />
        </section>

        <section>
          <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Evidências Fotográficas</h3>
          <div className="flex flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-ink/15 py-8 text-center transition-colors hover:border-emerald-400/30">
            <UploadCloud className="h-6 w-6 text-slate-500" />
            <p className="text-[13px] text-slate-300">Arraste fotos aqui ou clique para selecionar</p>
            <p className="text-[11.5px] text-slate-500">JPG, PNG até 10MB por arquivo</p>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-navy-600 to-navy-800"
              >
                <ImageIcon className="h-5 w-5 text-slate-600" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Assinatura</h3>
          <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] px-4 py-3">
            <PenLine className="h-4 w-4 text-slate-500" />
            <span className="text-[13px] text-slate-300">Responsável técnico: Geovanna Sena — CREA 145.238-D/SP</span>
          </div>
        </section>
      </div>
    </Modal>
  );
}
