import { useNavigate } from "react-router-dom";
import { CheckCircle2, ImageIcon, FileText, ArrowRight, ShoppingCart } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getObraById } from "@/mocks/obras";
import { OBRA_DEMO_ID, eventosAgenda, aprovacoesCliente, tarefasCronograma } from "@/mocks/demoObra";
import { evidencias } from "@/mocks/evidencias";

export function ClienteHome() {
  const navigate = useNavigate();
  const obra = getObraById(OBRA_DEMO_ID)!;
  const decisoesPendentes = aprovacoesCliente.filter((a) => a.status === "aguardando");
  const proximaAgenda = eventosAgenda.filter((e) => e.obraId === obra.id).slice(0, 3);
  const cronogramaPublicado = tarefasCronograma.filter((t) => t.obraId === obra.id && t.visivelCliente && !t.parentId);
  const fotos = evidencias.filter((e) => e.obraId === obra.id).slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Minha Obra" title={obra.nome} subtitle={`${obra.endereco} · Gestor(a) responsável: ${obra.responsavel}`} />

      {decisoesPendentes.length > 0 && (
        <Card className="border-brand-blue/30 bg-gradient-brand-soft p-5">
          <p className="text-[15px] font-semibold text-slate-50">
            Você possui {decisoesPendentes.length} decisão(ões) pendente(s).
          </p>
          <div className="mt-3 space-y-2">
            {decisoesPendentes.map((d) => (
              <button
                key={d.id}
                onClick={() => navigate(`/obras/${obra.id}?tab=compras`)}
                className="flex w-full items-center justify-between rounded-[var(--radius-sm)] border border-ink/10 bg-navy-800/60 px-3.5 py-2.5 text-left"
              >
                <span className="text-[13px] text-slate-200">{d.titulo} — {d.propostas} propostas · prazo {d.prazo}</span>
                <ArrowRight className="h-4 w-4 text-brand-blue" />
              </button>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1 p-5">
          <p className="text-[12px] text-slate-500">Andamento geral</p>
          <p className="mt-1 text-[28px] font-bold text-slate-50">{obra.progresso}%</p>
          <ProgressBar value={obra.progresso} tone="brand" className="mt-2" />
          <p className="mt-3 text-[12px] text-slate-500">Prazo final: <strong className="text-slate-200">{obra.prazo}</strong></p>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Cronograma publicado" subtitle="Visão simplificada, sem detalhes operacionais internos" />
          <CardBody className="space-y-2">
            {cronogramaPublicado.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5">
                <span className="text-[12.5px] text-slate-200">{t.nome}</span>
                <Badge tone={t.status === "concluido" ? "ok" : t.status === "atrasado" ? "critical" : t.status === "atencao" ? "warn" : "info"}>{t.progresso}%</Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Agenda" subtitle="Próximas visitas relevantes" />
          <CardBody className="space-y-2">
            {proximaAgenda.map((ev) => (
              <div key={ev.id} className="flex items-center gap-3 rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5">
                <CheckCircle2 className="h-4 w-4 text-brand-blue" />
                <div>
                  <p className="text-[12.5px] text-slate-200">{ev.titulo}</p>
                  <p className="text-[11px] text-slate-500">{ev.data} às {ev.horario}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Fotos selecionadas" subtitle="Evidências compartilhadas pela equipe" />
          <CardBody>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {fotos.map((f) => (
                <div key={f.id} className="flex aspect-square items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-navy-600 to-navy-800">
                  <ImageIcon className="h-4 w-4 text-slate-600" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button onClick={() => navigate("/documentos")} className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-ink/10 bg-ink/[0.03] p-4 text-left hover:bg-ink/[0.05]">
          <FileText className="h-5 w-5 text-brand-blue" />
          <span className="text-[13.5px] font-medium text-slate-100">Documentos disponibilizados</span>
        </button>
        <button onClick={() => navigate("/relatorios")} className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-ink/10 bg-ink/[0.03] p-4 text-left hover:bg-ink/[0.05]">
          <ShoppingCart className="h-5 w-5 text-brand-blue" />
          <span className="text-[13.5px] font-medium text-slate-100">Relatórios da obra</span>
        </button>
      </div>
    </div>
  );
}
