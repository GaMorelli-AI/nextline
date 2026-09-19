import { useState } from "react";
import { CheckCircle2, Sparkles, AlertTriangle, FileWarning, Layers } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SegmentedControl } from "@/components/ui/Tabs";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { projetosRevisao, documentosObra } from "@/mocks/demoObra";
import { DocumentosObraTab } from "@/features/obras/tabs/DocumentosObraTab";
import type { DocumentoObra, Obra, ProjetoRevisao, StatusDocumentoObra } from "@/types";
import { cn } from "@/lib/utils";

const statusDocTone: Record<StatusDocumentoObra, "ok" | "warn" | "critical" | "info" | "neutral"> = {
  "nao-enviado": "neutral",
  "aguardando-validacao": "warn",
  validado: "ok",
  "requer-revisao": "critical",
  expirado: "critical",
  "nao-aplicavel": "neutral",
};

const statusDocLabel: Record<StatusDocumentoObra, string> = {
  "nao-enviado": "Não enviado",
  "aguardando-validacao": "Aguardando validação",
  validado: "Validado",
  "requer-revisao": "Requer revisão",
  expirado: "Expirado",
  "nao-aplicavel": "Não aplicável",
};

const grupoLabel = { imprescindivel: "Imprescindível", comum: "Comum", condicional: "Condicional" } as const;

export function ProjetosDocumentosObraTab({ obra }: { obra: Obra }) {
  const [view, setView] = useState("projetos");
  const [projSelected, setProjSelected] = useState<ProjetoRevisao | null>(null);
  const [docSelected, setDocSelected] = useState<DocumentoObra | null>(null);
  const [analisando, setAnalisando] = useState(false);

  const projetos = projetosRevisao.filter((p) => p.obraId === obra.id);
  const documentos = documentosObra.filter((d) => d.obraId === obra.id);

  const categorias = Array.from(new Set(projetos.map((p) => p.categoria)));
  const grupos: (keyof typeof grupoLabel)[] = ["imprescindivel", "comum", "condicional"];

  function abrirDocumento(doc: DocumentoObra) {
    setDocSelected(doc);
    setAnalisando(true);
    setTimeout(() => setAnalisando(false), 900);
  }

  return (
    <div className="space-y-5">
      <SegmentedControl
        options={[
          { key: "projetos", label: "Projetos e Revisões" },
          { key: "checklist", label: "Checklist de Documentos" },
          { key: "biblioteca", label: "Biblioteca" },
        ]}
        active={view}
        onChange={setView}
      />

      {view === "projetos" &&
        (projetos.length === 0 ? (
          <EmptyState icon={<Layers className="h-6 w-6" />} title="Sem projetos cadastrados" description="Esta obra ainda não possui revisões de projeto no protótipo." />
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {categorias.map((cat) => {
              const revisoes = projetos.filter((p) => p.categoria === cat).sort((a, b) => b.revisao.localeCompare(a.revisao));
              const vigente = revisoes.find((r) => r.versaoVigente);
              return (
                <Card key={cat}>
                  <CardHeader title={`Projeto ${cat}`} subtitle={vigente ? `${vigente.revisao} · versão vigente` : "Sem versão vigente"} />
                  <CardBody className="space-y-2.5">
                    {revisoes.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setProjSelected(r)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-[var(--radius-md)] border p-3.5 text-left transition-colors",
                          r.versaoVigente ? "border-[var(--color-status-ok)]/30 bg-[var(--color-status-ok-bg)]" : "border-ink/10 bg-ink/[0.03] hover:bg-ink/[0.05]"
                        )}
                      >
                        <div>
                          <p className="text-[13px] font-semibold text-slate-100">{r.revisao}</p>
                          <p className="text-[11.5px] text-slate-500">{r.data} · {r.responsavel}</p>
                        </div>
                        {r.versaoVigente ? <Badge tone="ok">Versão Vigente</Badge> : <Badge tone="neutral">Substituído</Badge>}
                      </button>
                    ))}
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ))}

      {view === "checklist" &&
        (documentos.length === 0 ? (
          <EmptyState icon={<FileWarning className="h-6 w-6" />} title="Sem checklist de documentação" description="Esta obra ainda não possui checklist documental no protótipo." />
        ) : (
          <div className="space-y-5">
            {grupos.map((g) => {
              const docs = documentos.filter((d) => d.grupo === g);
              if (docs.length === 0) return null;
              return (
                <Card key={g}>
                  <CardHeader title={grupoLabel[g]} subtitle={`${docs.length} documento(s)`} />
                  <CardBody className="space-y-2.5">
                    {docs.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => abrirDocumento(d)}
                        className="flex w-full items-center justify-between rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] p-3.5 text-left hover:bg-ink/[0.05]"
                      >
                        <div>
                          <p className="text-[13px] font-medium text-slate-100">{d.nome}</p>
                          <p className="text-[11.5px] text-slate-500">
                            {d.categoria} {d.validadeAte && `· válido até ${d.validadeAte}`}
                          </p>
                        </div>
                        <Badge tone={statusDocTone[d.status]}>{statusDocLabel[d.status]}</Badge>
                      </button>
                    ))}
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ))}

      {view === "biblioteca" && <DocumentosObraTab obra={obra} />}

      <Drawer open={!!projSelected} onClose={() => setProjSelected(null)} title={projSelected?.nome} subtitle={projSelected?.revisao}>
        {projSelected && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge tone={projSelected.versaoVigente ? "ok" : "neutral"}>{projSelected.versaoVigente ? "Versão Vigente" : "Substituído"}</Badge>
              <Badge tone="neutral">{projSelected.status}</Badge>
              <Badge tone="neutral">{projSelected.origem === "integracao-externa" ? "Integração externa" : "NextLine"}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <p className="text-[11.5px] text-slate-500">Responsável</p>
                <p className="mt-0.5 font-medium text-slate-200">{projSelected.responsavel}</p>
              </div>
              <div>
                <p className="text-[11.5px] text-slate-500">Aprovado por</p>
                <p className="mt-0.5 font-medium text-slate-200">{projSelected.aprovadoPor ?? "—"}</p>
              </div>
            </div>
            {projSelected.observacoes && (
              <div className="rounded-[var(--radius-md)] border border-[var(--color-status-warn)]/25 bg-[var(--color-status-warn-bg)] p-3.5 text-[12.5px] text-slate-200">
                {projSelected.observacoes}
              </div>
            )}
            {projSelected.versaoVigente && (
              <div className="rounded-[var(--radius-md)] bg-gradient-brand-soft p-3.5 text-[12px] text-slate-200">
                Compra baseada em: <strong>{projSelected.nome} — {projSelected.revisao} — VERSÃO VIGENTE</strong>
              </div>
            )}
          </div>
        )}
      </Drawer>

      <Drawer open={!!docSelected} onClose={() => setDocSelected(null)} title={docSelected?.nome} subtitle={docSelected?.categoria}>
        {docSelected && (
          <div className="space-y-5">
            {analisando ? (
              <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] p-4 text-[13px] text-slate-300">
                <Sparkles className="h-4 w-4 animate-pulse text-brand-blue" /> Analisando documento...
              </div>
            ) : docSelected.iaResultado ? (
              <div className={cn("rounded-[var(--radius-md)] border p-4", docSelected.iaResultado.validado ? "border-[var(--color-status-ok)]/30 bg-[var(--color-status-ok-bg)]" : "border-[var(--color-status-critical)]/30 bg-[var(--color-status-critical-bg)]")}>
                <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-slate-100">
                  <Sparkles className="h-4 w-4" /> Next AI — análise documental
                </p>
                {docSelected.iaResultado.checks.map((c) => (
                  <p key={c} className="flex items-center gap-1.5 text-[12.5px] text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-status-ok)]" /> {c}
                  </p>
                ))}
                {docSelected.iaResultado.alerta && (
                  <p className="mt-2 flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--color-status-critical)]">
                    <AlertTriangle className="h-3.5 w-3.5" /> {docSelected.iaResultado.alerta}
                  </p>
                )}
                <p className="mt-3 text-[13px] font-bold uppercase tracking-wide text-slate-100">
                  {docSelected.iaResultado.validado ? "VALIDADO" : "REQUER REVISÃO"}
                </p>
              </div>
            ) : (
              <p className="text-[13px] text-slate-400">Nenhuma análise disponível para este documento ainda.</p>
            )}
            <Badge tone={statusDocTone[docSelected.status]}>{statusDocLabel[docSelected.status]}</Badge>
            {docSelected.validadeAte && (
              <p className="text-[13px] text-slate-300">
                Validade: <strong>{docSelected.validadeAte}</strong>
              </p>
            )}
            <Button variant="secondary" className="w-full">
              Substituir documento
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
