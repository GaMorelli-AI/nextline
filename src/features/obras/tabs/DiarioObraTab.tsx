import { useState } from "react";
import { Plus, Cloud, CloudRain, Sun, Users, Clock3, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { getRdosByObra } from "@/mocks/rdos";
import { NovoRDOForm } from "@/features/obras/tabs/NovoRDOForm";
import type { Obra, RDO } from "@/types";

const climaIcon: Record<string, typeof Sun> = {
  Bom: Sun,
  Nublado: Cloud,
  Chuva: CloudRain,
};

export function DiarioObraTab({ obra, openNovo }: { obra: Obra; openNovo?: boolean }) {
  const rdos = getRdosByObra(obra.id);
  const [novoOpen, setNovoOpen] = useState(!!openNovo);
  const [selected, setSelected] = useState<RDO | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-slate-500">{rdos.length} registros de diário de obra</p>
        <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => setNovoOpen(true)}>
          Novo Diário de Obra
        </Button>
      </div>

      <div className="space-y-3">
        {rdos.map((rdo) => {
          const ClimaIcon = climaIcon[rdo.clima] ?? Sun;
          return (
            <Card key={rdo.id} hoverable onClick={() => setSelected(rdo)} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-emerald-300">
                  <ClimaIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-100">RDO #{rdo.numero}</p>
                  <p className="text-[12.5px] text-slate-500">{rdo.data} · Autor: {rdo.autor}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[12.5px] text-slate-400 sm:gap-6">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> {rdo.colaboradores} colaboradores
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" /> {rdo.horasTrabalhadas}h
                </span>
                <Badge tone={statusToTone(rdo.status)}>{statusLabel(rdo.status)}</Badge>
                <ChevronRight className="h-4 w-4 text-slate-600" />
              </div>
            </Card>
          );
        })}
      </div>

      <NovoRDOForm open={novoOpen} onClose={() => setNovoOpen(false)} />

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `RDO #${selected.numero}` : ""}
        subtitle={selected ? `${selected.data} · ${selected.autor}` : ""}
      >
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <MiniStat label="Clima" value={selected.clima} />
              <MiniStat label="Colaboradores" value={String(selected.colaboradores)} />
              <MiniStat label="Horas" value={`${selected.horasTrabalhadas}h`} />
              <MiniStat label="Status" value={statusLabel(selected.status)} />
            </div>
            <div>
              <h4 className="mb-1.5 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">
                Serviços executados
              </h4>
              <p className="text-[13.5px] leading-relaxed text-slate-300">{selected.servicosExecutados}</p>
            </div>
            <div>
              <h4 className="mb-1.5 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">Ocorrências</h4>
              <p className="text-[13.5px] leading-relaxed text-slate-300">{selected.ocorrencias}</p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className="mt-0.5 text-[13.5px] font-medium text-slate-100">{value}</p>
    </div>
  );
}
