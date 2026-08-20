import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, X, ArrowUp, ArrowRight, Building2 } from "lucide-react";
import { useNextAI } from "@/context/NextAIContext";
import { conversaInicial, sugestoesAI, type AIMessage } from "@/mocks/ai";
import { cn } from "@/lib/utils";

export function NextAIPanel() {
  const { open, closePanel } = useNextAI();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [asked, setAsked] = useState(false);
  const navigate = useNavigate();

  if (!open) return null;

  function ask(question: string) {
    setAsked(true);
    setMessages(conversaInicial.map((m) => (m.autor === "usuario" ? { ...m, texto: question } : m)));
    setInput("");
  }

  function go(href: string) {
    closePanel();
    navigate(href);
  }

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" onClick={closePanel} />
      <div
        className="surface-panel relative z-10 flex h-full w-full max-w-md flex-col shadow-[var(--shadow-elevated)]"
        style={{ animation: "slide-in-right 0.24s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <style>{`@keyframes slide-in-right { from { transform: translateX(24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/[0.07] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-brand-soft">
              <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
            </div>
            <div>
              <p className="text-[14.5px] font-semibold text-slate-50">Next AI</p>
              <p className="text-[11.5px] text-slate-500">Inteligência operacional da NextLine</p>
            </div>
          </div>
          <button
            onClick={closePanel}
            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-xs)] text-slate-400 hover:bg-ink/[0.06] hover:text-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-5">
          {!asked ? (
            <div className="flex h-full flex-col justify-center gap-6">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand-soft">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-[15px] font-semibold text-slate-100">Como posso ajudar hoje?</p>
                <p className="mt-1 text-[13px] text-slate-500">
                  Pergunte sobre suas obras, ativos, contratos ou documentos.
                </p>
              </div>
              <div className="space-y-2">
                {sugestoesAI.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="w-full rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] px-4 py-3 text-left text-[13px] text-slate-300 transition-colors hover:border-emerald-400/30 hover:bg-ink/[0.05] hover:text-slate-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.autor === "usuario" ? "justify-end" : "justify-start")}>
                  {m.autor === "usuario" ? (
                    <div className="max-w-[80%] rounded-[var(--radius-md)] rounded-tr-sm bg-ink/[0.07] px-4 py-2.5 text-[13.5px] text-slate-100">
                      {m.texto}
                    </div>
                  ) : (
                    <div className="max-w-[92%] space-y-3">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-brand-soft">
                          <Sparkles className="h-3 w-3 text-emerald-400" />
                        </div>
                        <p className="pt-0.5 text-[13.5px] text-slate-200">{m.texto}</p>
                      </div>
                      {m.itens && (
                        <div className="space-y-2 pl-8">
                          {m.itens.map((item) => (
                            <button
                              key={item.titulo}
                              onClick={() => go(item.href)}
                              className="group flex w-full items-center gap-3 rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] px-3.5 py-3 text-left transition-colors hover:border-emerald-400/30 hover:bg-ink/[0.05]"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-ink/[0.05] text-slate-400">
                                <Building2 className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-medium text-slate-100">{item.titulo}</p>
                                <p className="truncate text-[12px] text-slate-500">{item.descricao}</p>
                              </div>
                              <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-emerald-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-ink/[0.07] p-4">
          <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.04] px-3.5 py-2.5 focus-within:border-emerald-400/40">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) ask(input.trim());
              }}
              placeholder="Pergunte sobre suas obras, ativos, contratos ou documentos..."
              className="flex-1 bg-transparent text-[13px] text-slate-100 placeholder:text-slate-500 outline-none"
            />
            <button
              onClick={() => input.trim() && ask(input.trim())}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-onbrand transition-transform hover:scale-105"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NextAIFloatingButton() {
  const { openPanel, open } = useNextAI();
  if (open) return null;
  return (
    <button
      onClick={openPanel}
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-onbrand shadow-[var(--shadow-glow-emerald)] transition-transform hover:scale-105"
    >
      <Sparkles className="h-6 w-6" />
    </button>
  );
}
