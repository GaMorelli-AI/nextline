import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, GanttChartSquare, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge, statusLabel, statusToTone } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { obras, getObraById } from "@/mocks/obras";
import { CronogramaTab } from "@/features/obras/tabs/CronogramaTab";

export function CronogramaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const obraId = searchParams.get("obra");
  const obra = obraId ? getObraById(obraId) : undefined;

  const obrasFiltradas = useMemo(
    () =>
      obras.filter(
        (o) =>
          !search ||
          o.nome.toLowerCase().includes(search.toLowerCase()) ||
          o.cliente.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  function selecionarObra(id: string) {
    setSearchParams({ obra: id });
  }

  if (obra) {
    return (
      <div className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-3.5 w-3.5" />} onClick={() => setSearchParams({})}>
              Trocar obra
            </Button>
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              <h1 className="text-[22px] font-semibold tracking-tight text-slate-50">{obra.nome}</h1>
              <Badge tone={statusToTone(obra.status)}>{statusLabel(obra.status)}</Badge>
            </div>
            <p className="mt-1 text-[13px] text-slate-500">
              {obra.cliente} · Contrato {obra.contrato}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Progresso</p>
              <p className="text-[15px] font-semibold text-slate-100">{obra.progresso}%</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Prazo previsto</p>
              <p className="text-[15px] font-semibold text-slate-100">{obra.prazo}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(`/obras/${obra.id}`)}>
              Ver obra completa
            </Button>
          </div>
        </div>

        <CronogramaTab obra={obra} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Cronograma"
        title="Cronograma"
        subtitle="Escolha uma obra para visualizar e ajustar o cronograma — marcos, predecessoras e simulações de atraso."
      />

      <div className="w-72">
        <Input icon={<Search className="h-4 w-4" />} placeholder="Buscar obra ou cliente..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {obrasFiltradas.length === 0 ? (
        <EmptyState icon={<Search className="h-6 w-6" />} title="Nenhuma obra encontrada" description="Ajuste o termo de busca." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {obrasFiltradas.map((o) => (
            <Card key={o.id} hoverable onClick={() => selecionarObra(o.id)} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[14.5px] font-semibold text-slate-100">{o.nome}</p>
                  <p className="mt-0.5 truncate text-[12px] text-slate-500">{o.cliente}</p>
                </div>
                <Badge tone={statusToTone(o.status)}>{statusLabel(o.status)}</Badge>
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-[12px] text-slate-500">
                  <span>Progresso</span>
                  <span className="font-medium text-slate-200">{o.progresso}%</span>
                </div>
                <ProgressBar value={o.progresso} tone="brand" />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-ink/[0.06] pt-4">
                <div className="flex items-center gap-2">
                  <Avatar initials={o.responsavelAvatar} size="sm" />
                  <span className="text-[12px] text-slate-300">{o.responsavel}</span>
                </div>
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-brand-blue">
                  <GanttChartSquare className="h-3.5 w-3.5" /> Abrir
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
