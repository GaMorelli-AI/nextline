import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ApprovalWorkflow({ etapas, etapaAtual }: { etapas: string[]; etapaAtual: number }) {
  return (
    <div className="flex items-center">
      {etapas.map((etapa, i) => {
        const done = i < etapaAtual;
        const current = i === etapaAtual;
        return (
          <div key={etapa} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-[12px] font-semibold transition-colors",
                  done && "border-emerald-400 bg-emerald-400 text-onbrand",
                  current && "border-emerald-400 bg-transparent text-emerald-400",
                  !done && !current && "border-ink/15 text-slate-600"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : current ? <span className="h-2 w-2 rounded-full bg-emerald-400" /> : i + 1}
              </div>
              <span className={cn("max-w-[80px] text-center text-[11px] leading-tight", current ? "font-medium text-slate-100" : "text-slate-500")}>
                {etapa}
              </span>
            </div>
            {i < etapas.length - 1 && (
              <div className={cn("mx-1.5 h-0.5 flex-1 rounded-full", done ? "bg-emerald-400" : "bg-ink/10")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
