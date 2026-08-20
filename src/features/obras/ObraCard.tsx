import { useNavigate } from "react-router-dom";
import { Calendar, MessageSquareWarning, FileClock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, statusLabel, statusToTone } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Avatar } from "@/components/ui/Avatar";
import type { Obra } from "@/types";

export function ObraCard({ obra }: { obra: Obra }) {
  const navigate = useNavigate();
  const progressTone =
    obra.status === "critico" ? "critical" : obra.status === "atencao" ? "warn" : obra.status === "concluido" ? "ok" : "brand";

  return (
    <Card hoverable onClick={() => navigate(`/obras/${obra.id}`)} className="flex flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-slate-50">{obra.nome}</p>
          <p className="mt-0.5 truncate text-[12.5px] text-slate-500">
            {obra.cliente} · Contrato {obra.contrato}
          </p>
        </div>
        <Badge tone={statusToTone(obra.status)}>{statusLabel(obra.status)}</Badge>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[12px] text-slate-500">
          <span>Progresso físico</span>
          <span className="font-medium text-slate-200">{obra.progresso}%</span>
        </div>
        <ProgressBar value={obra.progresso} tone={progressTone} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-y-2.5 text-[12.5px]">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Calendar className="h-3.5 w-3.5" /> Prazo
        </div>
        <div className="text-right text-slate-300">{obra.prazo}</div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <MessageSquareWarning className="h-3.5 w-3.5" /> NCs abertas
        </div>
        <div className="text-right text-slate-300">{obra.ncsAbertas}</div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <FileClock className="h-3.5 w-3.5" /> Último RDO
        </div>
        <div className="text-right text-slate-300">{obra.ultimoRdo}</div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-ink/[0.06] pt-4">
        <Avatar initials={obra.responsavelAvatar} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-medium text-slate-200">{obra.responsavel}</p>
          <p className="text-[11px] text-slate-500">Engenheiro(a) responsável</p>
        </div>
      </div>
    </Card>
  );
}
