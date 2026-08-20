import { useMemo, useState, type ReactNode } from "react";
import { ImageIcon, Calendar, MapPin, Tag, User, FileText } from "lucide-react";
import { Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { getEvidenciasByObra } from "@/mocks/evidencias";
import type { Evidencia, Obra } from "@/types";

const gradients = [
  "from-teal-900 via-navy-700 to-navy-900",
  "from-emerald-900 via-navy-700 to-navy-900",
  "from-cyan-900 via-navy-700 to-navy-900",
  "from-navy-600 via-navy-700 to-navy-900",
];

export function EvidenciasTab({ obra }: { obra: Obra }) {
  const evidencias = getEvidenciasByObra(obra.id);
  const [ambiente, setAmbiente] = useState("todos");
  const [disciplina, setDisciplina] = useState("todos");
  const [selected, setSelected] = useState<Evidencia | null>(null);

  const ambientes = useMemo(() => Array.from(new Set(evidencias.map((e) => e.ambiente))), [evidencias]);
  const disciplinas = useMemo(() => Array.from(new Set(evidencias.map((e) => e.disciplina))), [evidencias]);

  const filtered = evidencias.filter(
    (e) => (ambiente === "todos" || e.ambiente === ambiente) && (disciplina === "todos" || e.disciplina === disciplina)
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2.5">
        <Select value={ambiente} onChange={(e) => setAmbiente(e.target.value)}>
          <option value="todos">Ambiente: Todos</option>
          {ambientes.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </Select>
        <Select value={disciplina} onChange={(e) => setDisciplina(e.target.value)}>
          <option value="todos">Disciplina: Todas</option>
          {disciplinas.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
        <Select defaultValue="todos">
          <option value="todos">Tipo: Todos</option>
          <option>Progresso</option>
          <option>Não Conformidade</option>
          <option>Segurança</option>
          <option>Entrega</option>
        </Select>
        <Select defaultValue="todos">
          <option value="todos">Data: Últimos 30 dias</option>
          <option>Últimos 7 dias</option>
          <option>Este mês</option>
        </Select>
        <span className="ml-auto text-[12.5px] text-slate-500">{filtered.length} evidências</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((ev, i) => (
          <button
            key={ev.id}
            onClick={() => setSelected(ev)}
            className={`group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-gradient-to-br ${gradients[i % gradients.length]} text-left`}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-40 transition-opacity group-hover:opacity-20">
              <ImageIcon className="h-8 w-8 text-slate-300" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5">
              <p className="truncate text-[11.5px] font-medium text-slate-100">{ev.ambiente}</p>
              <p className="truncate text-[10.5px] text-slate-300">
                {ev.data} · {ev.hora}
              </p>
            </div>
            <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-slate-100">
              {ev.disciplina}
            </span>
          </button>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Evidência estruturada" size="md">
        {selected && (
          <div className="space-y-4">
            <div className={`flex aspect-video items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br ${gradients[0]}`}>
              <ImageIcon className="h-10 w-10 text-slate-400" />
            </div>
            <dl className="grid grid-cols-2 gap-4 text-[13px]">
              <MetaItem icon={<Calendar className="h-3.5 w-3.5" />} label="Data e hora" value={`${selected.data} às ${selected.hora}`} />
              <MetaItem icon={<MapPin className="h-3.5 w-3.5" />} label="Ambiente" value={selected.ambiente} />
              <MetaItem icon={<Tag className="h-3.5 w-3.5" />} label="Disciplina" value={selected.disciplina} />
              <MetaItem icon={<User className="h-3.5 w-3.5" />} label="Responsável" value={selected.responsavel} />
              <MetaItem icon={<FileText className="h-3.5 w-3.5" />} label="RDO associado" value={selected.rdo} />
              <MetaItem icon={<Tag className="h-3.5 w-3.5" />} label="Tipo" value={selected.tipo} />
            </dl>
          </div>
        )}
      </Modal>
    </div>
  );
}

function MetaItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11.5px] text-slate-500">
        {icon} {label}
      </dt>
      <dd className="mt-0.5 font-medium text-slate-200">{value}</dd>
    </div>
  );
}
