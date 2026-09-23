import { useState } from "react";
import {
  NotebookPen,
  CalendarRange,
  CalendarDays,
  Presentation,
  ShieldAlert,
  FileCheck2,
  Users,
  Truck,
  Download,
  ImageIcon,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Input";
import { SegmentedControl } from "@/components/ui/Tabs";
import { obras } from "@/mocks/obras";
import { getEvidenciasByObra } from "@/mocks/evidencias";
import { cn } from "@/lib/utils";

const relatorios = [
  { icon: NotebookPen, titulo: "Diário de Obra", descricao: "Consolidado de diários no período selecionado.", audiencias: ["interno", "cliente"] },
  { icon: CalendarRange, titulo: "Relatório de Visita", descricao: "Registro fotográfico e checklist de uma visita técnica.", audiencias: ["interno", "cliente", "fornecedor"] },
  { icon: CalendarDays, titulo: "Relatório Semanal", descricao: "Progresso, equipe e ocorrências da semana.", audiencias: ["interno", "cliente"] },
  { icon: Presentation, titulo: "Relatório Executivo", descricao: "Resumo estratégico para stakeholders.", audiencias: ["interno"] },
  { icon: ShieldAlert, titulo: "Não Conformidades", descricao: "Status e histórico de NCs da obra.", audiencias: ["interno"] },
  { icon: FileCheck2, titulo: "Medições e Pedidos", descricao: "Extrato de cotações, pedidos e aprovações.", audiencias: ["interno", "cliente"] },
  { icon: Users, titulo: "Performance de Fornecedores", descricao: "Avaliação e ocorrências por fornecedor.", audiencias: ["interno"] },
  { icon: Truck, titulo: "Relatório do Fornecedor", descricao: "Atividades, prazos e pendências de um fornecedor específico.", audiencias: ["interno", "fornecedor"] },
];

const audienciaLabel: Record<string, string> = { interno: "Interno", cliente: "Cliente", fornecedor: "Fornecedor" };

export function RelatoriosPage() {
  const [gerando, setGerando] = useState<string | null>(null);
  const [audiencia, setAudiencia] = useState("interno");
  const [obraId, setObraId] = useState(obras[0]?.id);
  const [evidenciasSelecionadas, setEvidenciasSelecionadas] = useState<Set<string>>(new Set());
  const [concluido, setConcluido] = useState(false);

  const evidenciasDaObra = obraId ? getEvidenciasByObra(obraId) : [];

  function abrirGerar(titulo: string) {
    setGerando(titulo);
    setConcluido(false);
    setEvidenciasSelecionadas(new Set(evidenciasDaObra.filter((e) => e.incluirRelatorio !== false).map((e) => e.id)));
  }

  function alternarEvidencia(id: string) {
    setEvidenciasSelecionadas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Central de Relatórios"
        title="Relatórios"
        subtitle="Gere relatórios segmentados por audiência — cada perfil vê apenas o que lhe pertence."
      />

      <div className="flex flex-wrap items-center gap-3">
        <Select value={obraId} onChange={(e) => setObraId(e.target.value)}>
          {obras.map((o) => (
            <option key={o.id} value={o.id}>
              {o.nome}
            </option>
          ))}
        </Select>
        <SegmentedControl
          options={[
            { key: "interno", label: "Interno" },
            { key: "cliente", label: "Cliente" },
            { key: "fornecedor", label: "Fornecedor" },
          ]}
          active={audiencia}
          onChange={setAudiencia}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {relatorios
          .filter((r) => r.audiencias.includes(audiencia))
          .map((r) => (
            <Card key={r.titulo} className="flex flex-col p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-brand-soft text-brand-blue">
                <r.icon className="h-5 w-5" />
              </div>
              <p className="mt-3.5 text-[14px] font-semibold text-slate-100">{r.titulo}</p>
              <p className="mt-1 flex-1 text-[12.5px] text-slate-500">{r.descricao}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => abrirGerar(r.titulo)}>
                  Gerar relatório
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  icon={<img src="/brand/nextline-symbol.png" alt="Gerar com Next AI" className="h-4 w-4 object-contain" />}
                  onClick={() => abrirGerar(r.titulo)}
                  title="Gerar com Next AI"
                />
              </div>
            </Card>
          ))}
      </div>

      <Modal open={!!gerando} onClose={() => setGerando(null)} title={gerando ?? ""} size={concluido || evidenciasDaObra.length === 0 ? "sm" : "md"}>
        {concluido ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand-soft">
              <Download className="h-6 w-6 text-brand-blue" />
            </div>
            <p className="text-[13.5px] text-slate-300">
              Relatório de <strong className="text-slate-100">{gerando}</strong> gerado para audiência{" "}
              <strong className="text-slate-100">{audienciaLabel[audiencia]}</strong>
              {evidenciasDaObra.length > 0 && (
                <>
                  {" "}
                  com <strong className="text-slate-100">{evidenciasSelecionadas.size}</strong> evidência(s) anexada(s)
                </>
              )}
              .
            </p>
            <Button variant="primary" onClick={() => setGerando(null)}>
              Concluir
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {evidenciasDaObra.length > 0 && (
              <div>
                <p className="mb-2.5 text-[12.5px] font-medium text-slate-400">
                  Evidências desta obra — marque as que devem entrar no relatório
                </p>
                <div className="max-h-72 space-y-1.5 overflow-y-auto scrollbar-thin pr-1">
                  {evidenciasDaObra.map((ev) => {
                    const marcada = evidenciasSelecionadas.has(ev.id);
                    return (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => alternarEvidencia(ev.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-[var(--radius-sm)] border p-2.5 text-left transition-colors",
                          marcada ? "border-brand-blue/30 bg-gradient-brand-soft" : "border-ink/10 bg-ink/[0.03] hover:bg-ink/[0.05]"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[4px] border",
                            marcada ? "border-brand-blue bg-brand-blue text-onbrand" : "border-ink/20"
                          )}
                        >
                          {marcada && <Check className="h-3 w-3" />}
                        </span>
                        <ImageIcon className="h-4 w-4 shrink-0 text-slate-500" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12.5px] font-medium text-slate-100">
                            {ev.ambiente} {ev.formato === "360" && "· 360°"}
                          </span>
                          <span className="block truncate text-[11px] text-slate-500">
                            {ev.disciplina} · {ev.data}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => setConcluido(true)}
            >
              Gerar relatório{evidenciasDaObra.length > 0 && ` (${evidenciasSelecionadas.size} evidência(s))`}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
