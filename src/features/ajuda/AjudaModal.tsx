import { useState } from "react";
import { HelpCircle, Bug, Lightbulb, MessageCircleQuestion, UploadCloud, CheckCircle2, Mail, BookOpen } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type Categoria = "duvida" | "problema" | "sugestao" | "outro";

const categorias: { value: Categoria; label: string; icon: typeof HelpCircle }[] = [
  { value: "duvida", label: "Dúvida", icon: MessageCircleQuestion },
  { value: "problema", label: "Reportar problema", icon: Bug },
  { value: "sugestao", label: "Sugestão", icon: Lightbulb },
  { value: "outro", label: "Outro", icon: HelpCircle },
];

function gerarProtocolo() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `NX-${n}`;
}

export function AjudaModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [categoria, setCategoria] = useState<Categoria>("duvida");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [anexo, setAnexo] = useState(false);
  const [enviado, setEnviado] = useState<string | null>(null);

  function handleClose() {
    onClose();
    setEnviado(null);
    setCategoria("duvida");
    setAssunto("");
    setMensagem("");
    setAnexo(false);
  }

  function handleEnviar() {
    setEnviado(gerarProtocolo());
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Ajuda e Suporte"
      size="md"
      footer={
        enviado ? (
          <Button variant="primary" onClick={handleClose}>
            Concluir
          </Button>
        ) : (
          <>
            <Button variant="ghost" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleEnviar} disabled={!assunto.trim() || !mensagem.trim()}>
              Enviar
            </Button>
          </>
        )
      }
    >
      {enviado ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand-soft">
            <CheckCircle2 className="h-7 w-7 text-brand-blue" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-slate-100">Solicitação enviada</p>
            <p className="mt-1 text-[13px] text-slate-500">
              Protocolo <strong className="text-slate-200">{enviado}</strong> — nossa equipe responde em até 24h úteis.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <Label>O que você precisa?</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {categorias.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategoria(c.value)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-[var(--radius-md)] border px-2 py-3 text-center text-[11.5px] font-medium transition-colors",
                    categoria === c.value
                      ? "border-brand-blue/40 bg-gradient-brand-soft text-slate-100"
                      : "border-ink/10 text-slate-400 hover:bg-ink/[0.04]"
                  )}
                >
                  <c.icon className={cn("h-4 w-4", categoria === c.value && "text-brand-blue")} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Assunto</Label>
            <Input placeholder="Resuma em poucas palavras..." value={assunto} onChange={(e) => setAssunto(e.target.value)} />
          </div>

          <div>
            <Label>Mensagem</Label>
            <Textarea
              rows={4}
              placeholder={
                categoria === "problema"
                  ? "Descreva o problema: o que você esperava que acontecesse e o que aconteceu de fato..."
                  : "Descreva sua dúvida, sugestão ou solicitação..."
              }
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
          </div>

          <div>
            <Label>Anexar captura de tela (opcional)</Label>
            <button
              onClick={() => setAnexo(true)}
              className="flex w-full flex-col items-center justify-center gap-1.5 rounded-[var(--radius-lg)] border-2 border-dashed border-ink/15 py-6 text-center transition-colors hover:border-brand-blue/30"
            >
              <UploadCloud className="h-5 w-5 text-slate-500" />
              <span className="text-[12.5px] text-slate-300">
                {anexo ? "1 arquivo anexado" : "Arraste um arquivo ou clique para selecionar"}
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-2 border-t border-ink/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <a href="#" className="flex items-center gap-1.5 text-[12.5px] text-slate-400 hover:text-brand-blue">
              <BookOpen className="h-3.5 w-3.5" /> Central de ajuda e FAQ
            </a>
            <a href="#" className="flex items-center gap-1.5 text-[12.5px] text-slate-400 hover:text-brand-blue">
              <Mail className="h-3.5 w-3.5" /> suporte@nextline.com.br
            </a>
          </div>
        </div>
      )}
    </Modal>
  );
}
