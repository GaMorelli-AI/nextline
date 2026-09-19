import { useNavigate } from "react-router-dom";
import { HardHat, ArrowRight, CalendarDays, FolderKanban } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useProfile } from "@/context/ProfileContext";
import { tarefasCronograma, eventosAgenda, OBRA_DEMO_ID } from "@/mocks/demoObra";
import { getObraById } from "@/mocks/obras";

const outrasObras = [
  { obraId: "apartamento-moema", resumo: "1 não conformidade em aberto" },
  { obraId: "casa-alphaville", resumo: "Entrega em 5 dias" },
];

export function FornecedorHome() {
  const navigate = useNavigate();
  const { nome } = useProfile();
  const obraPrincipal = getObraById(OBRA_DEMO_ID)!;
  const minhasAtividades = tarefasCronograma.filter((t) => t.fornecedor === nome && t.obraId === OBRA_DEMO_ID);
  const meusEventos = eventosAgenda.filter((e) => e.responsavel === nome);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Fornecedor" title="Minhas Obras" subtitle={`Obras, prazos e entregas de ${nome}.`} />

      <Card hoverable onClick={() => navigate(`/obras/${obraPrincipal.id}?tab=compras`)} className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-brand-soft text-brand-blue">
              <HardHat className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-100">{obraPrincipal.nome}</p>
              <p className="text-[12px] text-slate-500">{minhasAtividades.length} atividades sob sua responsabilidade</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-500" />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {outrasObras.map((o) => {
          const obra = getObraById(o.obraId);
          if (!obra) return null;
          return (
            <Card key={o.obraId} hoverable onClick={() => navigate(`/obras/${o.obraId}`)} className="flex items-center justify-between p-4">
              <div>
                <p className="text-[13.5px] font-semibold text-slate-100">{obra.nome}</p>
                <p className="text-[12px] text-slate-500">{o.resumo}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Minhas Atividades" subtitle={obraPrincipal.nome} action={<FolderKanban className="h-4 w-4 text-slate-500" />} />
          <CardBody className="space-y-2">
            {minhasAtividades.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5">
                <span className="text-[12.5px] text-slate-200">{t.nome}</span>
                <Badge tone={t.status === "concluido" ? "ok" : t.status === "atrasado" ? "critical" : t.status === "atencao" ? "warn" : "info"}>{t.progresso}%</Badge>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Minha Agenda" subtitle="Visitas e entregas confirmadas" action={<CalendarDays className="h-4 w-4 text-slate-500" />} />
          <CardBody className="space-y-2">
            {meusEventos.length === 0 ? (
              <p className="text-[12.5px] text-slate-500">Nenhum evento agendado no momento.</p>
            ) : (
              meusEventos.map((ev) => (
                <div key={ev.id} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5">
                  <span className="text-[12.5px] text-slate-200">{ev.titulo}</span>
                  <span className="text-[11px] text-slate-500">{ev.data} · {ev.horario}</span>
                </div>
              ))
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
