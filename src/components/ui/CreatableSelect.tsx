import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import { Label } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export function CreatableSelect({
  label,
  value,
  onChange,
  options,
  onCreateOption,
  placeholder = "Selecionar...",
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  onCreateOption: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const queryTrimmed = query.trim();
  const filtered = options.filter((o) => o.toLowerCase().includes(queryTrimmed.toLowerCase()));
  const exactMatch = options.some((o) => o.toLowerCase() === queryTrimmed.toLowerCase());

  function selecionar(v: string) {
    onChange(v);
    setQuery("");
    setOpen(false);
  }

  function criarNova() {
    if (!queryTrimmed || exactMatch) return;
    onCreateOption(queryTrimmed);
    selecionar(queryTrimmed);
  }

  return (
    <div ref={rootRef} className="relative">
      {label && <Label>{label}</Label>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center justify-between rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.04] px-3 text-left text-[13.5px] text-slate-100 outline-none transition-colors focus:border-emerald-400/40 ring-brand-focus"
      >
        <span className={cn("truncate", !value && "text-slate-500")}>{value || placeholder}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-500" />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-[var(--radius-sm)] border border-ink/10 bg-navy-800 shadow-[var(--shadow-elevated)]">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (filtered.length === 1) selecionar(filtered[0]);
                else criarNova();
              }
            }}
            placeholder="Buscar ou criar novo..."
            className="w-full border-b border-ink/10 bg-transparent px-3 py-2 text-[13px] text-slate-100 outline-none placeholder:text-slate-500"
          />
          <div className="max-h-48 overflow-y-auto scrollbar-thin py-1">
            {filtered.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => selecionar(o)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-slate-200 hover:bg-ink/[0.06]"
              >
                <Check className={cn("h-3.5 w-3.5 shrink-0 text-brand-blue", value !== o && "opacity-0")} />
                <span className="truncate">{o}</span>
              </button>
            ))}
            {filtered.length === 0 && !queryTrimmed && <p className="px-3 py-2 text-[12px] text-slate-500">Nenhuma opção ainda.</p>}
            {queryTrimmed && !exactMatch && (
              <button
                type="button"
                onClick={criarNova}
                className="flex w-full items-center gap-2 border-t border-ink/[0.07] px-3 py-2 text-left text-[13px] font-medium text-brand-blue hover:bg-ink/[0.06]"
              >
                <Plus className="h-3.5 w-3.5 shrink-0" /> Criar "{queryTrimmed}"
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
