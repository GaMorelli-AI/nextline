import { useState, type ReactNode } from "react";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  GanttChartSquare,
  CalendarDays,
  NotebookPen,
  Images,
  ShieldAlert,
  FolderKanban,
  ShoppingCart,
  ListChecks,
  BarChart2,
  History,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge, statusLabel, statusToTone } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getObraById } from "@/mocks/obras";

import { VisaoGeralTab } from "@/features/obras/tabs/VisaoGeralTab";
import { CronogramaTab } from "@/features/obras/tabs/CronogramaTab";
import { AgendaObraTab } from "@/features/obras/tabs/AgendaObraTab";
import { DiarioObraTab } from "@/features/obras/tabs/DiarioObraTab";
import { EvidenciasTab } from "@/features/obras/tabs/EvidenciasTab";
import { NaoConformidadesTab } from "@/features/obras/tabs/NaoConformidadesTab";
import { ProjetosDocumentosObraTab } from "@/features/obras/tabs/ProjetosDocumentosObraTab";
import { ComprasObraTab } from "@/features/obras/tabs/ComprasObraTab";
import { PendenciasObraTab } from "@/features/obras/tabs/PendenciasObraTab";
import { RelatoriosObraTab } from "@/features/obras/tabs/RelatoriosObraTab";
import { HistoricoObraTab } from "@/features/obras/tabs/HistoricoObraTab";

const tabsConfig = [
  { key: "visao-geral", label: "Visão Geral", icon: <LayoutDashboard className="h-3.5 w-3.5" /> },
  { key: "cronograma", label: "Cronograma", icon: <GanttChartSquare className="h-3.5 w-3.5" /> },
  { key: "agenda", label: "Agenda", icon: <CalendarDays className="h-3.5 w-3.5" /> },
  { key: "diario-obra", label: "Diário de Obra", icon: <NotebookPen className="h-3.5 w-3.5" /> },
  { key: "documentos", label: "Projetos e Documentos", icon: <FolderKanban className="h-3.5 w-3.5" /> },
  { key: "compras", label: "Compras e Fornecedores", icon: <ShoppingCart className="h-3.5 w-3.5" /> },
  { key: "evidencias", label: "Evidências", icon: <Images className="h-3.5 w-3.5" /> },
  { key: "pendencias", label: "Pendências", icon: <ListChecks className="h-3.5 w-3.5" /> },
  { key: "nao-conformidades", label: "Não Conformidades", icon: <ShieldAlert className="h-3.5 w-3.5" /> },
  { key: "relatorios", label: "Relatórios", icon: <BarChart2 className="h-3.5 w-3.5" /> },
  { key: "historico", label: "Histórico", icon: <History className="h-3.5 w-3.5" /> },
];

export function ObraDetailPage() {
  const { obraId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const obra = obraId ? getObraById(obraId) : undefined;
  const initialTab = searchParams.get("tab") ?? "visao-geral";
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!obra) return <Navigate to="/obras" replace />;

  function changeTab(key: string) {
    setActiveTab(key);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", key);
      return next;
    });
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Gestão de Obras", href: "/obras" }, { label: obra.nome }]} />

      <div className="surface-card rounded-[var(--radius-lg)] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[22px] font-semibold tracking-tight text-slate-50">{obra.nome}</h1>
              <Badge tone={statusToTone(obra.status)}>{statusLabel(obra.status)}</Badge>
            </div>
            <p className="mt-1 text-[13px] text-slate-500">
              {obra.cliente} · Contrato {obra.contrato} · {obra.endereco}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
            <Metric label="Progresso">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-slate-100">{obra.progresso}%</span>
              </div>
              <ProgressBar value={obra.progresso} tone="brand" size="sm" className="mt-1 w-20" />
            </Metric>
            <Metric label="Contrato">
              <span className="text-[14px] font-medium text-slate-100">{obra.contrato}</span>
            </Metric>
            <Metric label="Responsável">
              <div className="flex items-center gap-2">
                <Avatar initials={obra.responsavelAvatar} size="xs" />
                <span className="text-[13px] font-medium text-slate-100">{obra.responsavel}</span>
              </div>
            </Metric>
            <Metric label="Prazo previsto">
              <span className="text-[14px] font-medium text-slate-100">{obra.prazo}</span>
            </Metric>
          </div>
        </div>
      </div>

      <Tabs tabs={tabsConfig} active={activeTab} onChange={changeTab} />

      <div className="animate-fade-in">
        {activeTab === "visao-geral" && <VisaoGeralTab obra={obra} />}
        {activeTab === "cronograma" && <CronogramaTab obra={obra} />}
        {activeTab === "agenda" && <AgendaObraTab obra={obra} />}
        {activeTab === "diario-obra" && <DiarioObraTab obra={obra} openNovo={searchParams.get("novo") === "1"} />}
        {activeTab === "documentos" && <ProjetosDocumentosObraTab obra={obra} />}
        {activeTab === "compras" && <ComprasObraTab obra={obra} />}
        {activeTab === "evidencias" && <EvidenciasTab obra={obra} />}
        {activeTab === "pendencias" && <PendenciasObraTab obra={obra} />}
        {activeTab === "nao-conformidades" && <NaoConformidadesTab obra={obra} />}
        {activeTab === "relatorios" && <RelatoriosObraTab obra={obra} />}
        {activeTab === "historico" && <HistoricoObraTab obra={obra} />}
      </div>
    </div>
  );
}

function Metric({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
