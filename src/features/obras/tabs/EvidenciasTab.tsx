import { useMemo, useRef, useState, type ReactNode } from "react";
import { ImageIcon, Calendar, MapPin, Tag, User, FileText, Plus, Camera, UploadCloud, Link2, Truck, Wrench, ListChecks } from "lucide-react";
import { Select, Input, Label } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CreatableSelect } from "@/components/ui/CreatableSelect";
import { SegmentedControl } from "@/components/ui/Tabs";
import { useProfile } from "@/context/ProfileContext";
import { evidencias, getEvidenciasByObra } from "@/mocks/evidencias";
import { tagsAmbiente, tagsAtividade, tagsDisciplina, tagsFornecedor, tagsItem, tagsStatus } from "@/mocks/evidenciaTags";
import type { Evidencia, Obra } from "@/types";

const gradients = [
  "from-teal-900 via-navy-700 to-navy-900",
  "from-emerald-900 via-navy-700 to-navy-900",
  "from-cyan-900 via-navy-700 to-navy-900",
  "from-navy-600 via-navy-700 to-navy-900",
];

let nextEvidenciaId = 1;

interface NovaEvidenciaForm {
  formato: "foto" | "360";
  arquivos: string[];
  modo360: "link" | "arquivo";
  link360: string;
  ambiente: string;
  fornecedor: string;
  item: string;
  disciplina: string;
  atividade: string;
  status: string;
  tipo: string;
  responsavel: string;
}

function formVazio(responsavel: string): NovaEvidenciaForm {
  return {
    formato: "foto",
    arquivos: [],
    modo360: "link",
    link360: "",
    ambiente: "",
    fornecedor: "",
    item: "",
    disciplina: "",
    atividade: "",
    status: "",
    tipo: "Progresso",
    responsavel,
  };
}

export function EvidenciasTab({ obra }: { obra: Obra }) {
  const { nome } = useProfile();
  const [lista, setLista] = useState(() => getEvidenciasByObra(obra.id));
  const [ambiente, setAmbiente] = useState("todos");
  const [disciplina, setDisciplina] = useState("todos");
  const [selected, setSelected] = useState<Evidencia | null>(null);
  const [novaOpen, setNovaOpen] = useState(false);
  const [form, setForm] = useState<NovaEvidenciaForm>(() => formVazio(nome));
  const [ambientesTags, setAmbientesTags] = useState(tagsAmbiente);
  const [fornecedoresTags, setFornecedoresTags] = useState(tagsFornecedor);
  const [itensTags, setItensTags] = useState(tagsItem);
  const [disciplinasTags, setDisciplinasTags] = useState(tagsDisciplina);
  const [atividadesTags, setAtividadesTags] = useState(tagsAtividade);
  const [statusTags, setStatusTags] = useState(tagsStatus);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const arquivo360Ref = useRef<HTMLInputElement>(null);

  const ambientes = useMemo(() => Array.from(new Set(lista.map((e) => e.ambiente))), [lista]);
  const disciplinas = useMemo(() => Array.from(new Set(lista.map((e) => e.disciplina))), [lista]);

  const filtered = lista.filter(
    (e) => (ambiente === "todos" || e.ambiente === ambiente) && (disciplina === "todos" || e.disciplina === disciplina)
  );

  function abrirNova() {
    setForm(formVazio(nome));
    setNovaOpen(true);
  }

  function criarTag(setter: (fn: (prev: string[]) => string[]) => void, valor: string) {
    setter((prev) => (prev.includes(valor) ? prev : [...prev, valor]));
  }

  function salvarNovaEvidencia() {
    if (!form.ambiente.trim() || !form.disciplina.trim()) return;
    if (form.formato === "360" && form.modo360 === "link" && !form.link360.trim()) return;

    const agora = new Date();
    const nova: Evidencia = {
      id: `ev-custom-${nextEvidenciaId++}`,
      obraId: obra.id,
      data: agora.toLocaleDateString("pt-BR"),
      hora: agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      ambiente: form.ambiente.trim(),
      disciplina: form.disciplina.trim(),
      tipo: form.tipo,
      responsavel: form.responsavel.trim() || nome,
      rdo: "—",
      thumb: String((lista.length % 6) + 1),
      fornecedor: form.fornecedor.trim() || undefined,
      item: form.item.trim() || undefined,
      atividade: form.atividade.trim() || undefined,
      status: form.status.trim() || undefined,
      formato: form.formato,
      link360: form.formato === "360" ? (form.modo360 === "link" ? form.link360.trim() : form.arquivos[0]) : undefined,
      incluirRelatorio: true,
    };

    evidencias.push(nova);
    setLista(getEvidenciasByObra(obra.id));
    setNovaOpen(false);
  }

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
        <span className="text-[12.5px] text-slate-500">{filtered.length} evidências</span>
        <Button variant="primary" size="sm" className="ml-auto" icon={<Plus className="h-3.5 w-3.5" />} onClick={abrirNova}>
          Adicionar Evidências
        </Button>
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
            <div className="absolute right-2 top-2 flex gap-1">
              {ev.formato === "360" && (
                <span className="rounded-full bg-brand-blue px-2 py-0.5 text-[10px] font-semibold text-onbrand">360°</span>
              )}
              <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-slate-100">{ev.disciplina}</span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-[var(--radius-md)] border border-dashed border-ink/15 py-12 text-center text-[13px] text-slate-500">
            Nenhuma evidência encontrada com esses filtros.
          </div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Evidência estruturada" size="md">
        {selected && (
          <div className="space-y-4">
            <div className={`flex aspect-video items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br ${gradients[0]}`}>
              {selected.formato === "360" ? (
                <div className="flex flex-col items-center gap-2 text-slate-300">
                  <span className="rounded-full bg-brand-blue px-3 py-1 text-[12px] font-semibold text-onbrand">Imagem 360°</span>
                  {selected.link360 && (
                    <a href={selected.link360} target="_blank" rel="noreferrer" className="text-[12px] text-slate-300 underline">
                      Abrir visualização 360°
                    </a>
                  )}
                </div>
              ) : (
                <ImageIcon className="h-10 w-10 text-slate-400" />
              )}
            </div>
            <dl className="grid grid-cols-2 gap-4 text-[13px]">
              <MetaItem icon={<Calendar className="h-3.5 w-3.5" />} label="Data e hora" value={`${selected.data} às ${selected.hora}`} />
              <MetaItem icon={<MapPin className="h-3.5 w-3.5" />} label="Ambiente" value={selected.ambiente} />
              <MetaItem icon={<Tag className="h-3.5 w-3.5" />} label="Disciplina/Tipologia" value={selected.disciplina} />
              <MetaItem icon={<User className="h-3.5 w-3.5" />} label="Responsável" value={selected.responsavel} />
              {selected.fornecedor && <MetaItem icon={<Truck className="h-3.5 w-3.5" />} label="Fornecedor" value={selected.fornecedor} />}
              {selected.item && <MetaItem icon={<Wrench className="h-3.5 w-3.5" />} label="Item" value={selected.item} />}
              {selected.atividade && <MetaItem icon={<ListChecks className="h-3.5 w-3.5" />} label="Atividade" value={selected.atividade} />}
              {selected.status && <MetaItem icon={<Tag className="h-3.5 w-3.5" />} label="Status" value={selected.status} />}
              <MetaItem icon={<FileText className="h-3.5 w-3.5" />} label="RDO associado" value={selected.rdo} />
              <MetaItem icon={<Tag className="h-3.5 w-3.5" />} label="Tipo" value={selected.tipo} />
            </dl>
          </div>
        )}
      </Modal>

      <Modal
        open={novaOpen}
        onClose={() => setNovaOpen(false)}
        title="Adicionar Evidências"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setNovaOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={salvarNovaEvidencia} disabled={!form.ambiente.trim() || !form.disciplina.trim()}>
              Adicionar
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <Label>Formato</Label>
            <SegmentedControl
              options={[
                { key: "foto", label: "Foto" },
                { key: "360", label: "Imagem 360°" },
              ]}
              active={form.formato}
              onChange={(v) => setForm({ ...form, formato: v as "foto" | "360" })}
            />
          </div>

          {form.formato === "foto" ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => setForm({ ...form, arquivos: Array.from(e.target.files ?? []).map((f) => f.name) })}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-ink/15 py-8 text-center transition-colors hover:border-brand-blue/30"
              >
                <UploadCloud className="h-6 w-6 text-slate-500" />
                <p className="text-[13px] text-slate-300">
                  {form.arquivos.length > 0 ? `${form.arquivos.length} arquivo(s) selecionado(s)` : "Arraste fotos aqui ou clique para selecionar"}
                </p>
                <p className="text-[11.5px] text-slate-500">JPG, PNG até 10MB por arquivo</p>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <SegmentedControl
                options={[
                  { key: "link", label: "Link" },
                  { key: "arquivo", label: "Arquivo" },
                ]}
                active={form.modo360}
                onChange={(v) => setForm({ ...form, modo360: v as "link" | "arquivo" })}
              />
              {form.modo360 === "link" ? (
                <Input
                  icon={<Link2 className="h-4 w-4" />}
                  placeholder="https://... (link da visualização 360°)"
                  value={form.link360}
                  onChange={(e) => setForm({ ...form, link360: e.target.value })}
                />
              ) : (
                <div>
                  <input
                    ref={arquivo360Ref}
                    type="file"
                    accept="image/*,.mp4,.gltf,.glb"
                    className="hidden"
                    onChange={(e) => setForm({ ...form, arquivos: e.target.files?.[0] ? [e.target.files[0].name] : [] })}
                  />
                  <button
                    type="button"
                    onClick={() => arquivo360Ref.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-ink/15 py-6 text-[13px] text-slate-300 transition-colors hover:border-brand-blue/30"
                  >
                    <UploadCloud className="h-5 w-5 text-slate-500" />
                    {form.arquivos[0] ?? "Selecionar arquivo 360°"}
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CreatableSelect
              label="Ambiente *"
              value={form.ambiente}
              onChange={(v) => setForm({ ...form, ambiente: v })}
              options={ambientesTags}
              onCreateOption={(v) => criarTag(setAmbientesTags, v)}
              placeholder="Selecionar ambiente"
            />
            <CreatableSelect
              label="Fornecedor"
              value={form.fornecedor}
              onChange={(v) => setForm({ ...form, fornecedor: v })}
              options={fornecedoresTags}
              onCreateOption={(v) => criarTag(setFornecedoresTags, v)}
              placeholder="Selecionar fornecedor"
            />
            <CreatableSelect
              label="Item"
              value={form.item}
              onChange={(v) => setForm({ ...form, item: v })}
              options={itensTags}
              onCreateOption={(v) => criarTag(setItensTags, v)}
              placeholder="Selecionar item"
            />
            <CreatableSelect
              label="Disciplina/Tipologia *"
              value={form.disciplina}
              onChange={(v) => setForm({ ...form, disciplina: v })}
              options={disciplinasTags}
              onCreateOption={(v) => criarTag(setDisciplinasTags, v)}
              placeholder="Selecionar disciplina"
            />
            <CreatableSelect
              label="Atividade"
              value={form.atividade}
              onChange={(v) => setForm({ ...form, atividade: v })}
              options={atividadesTags}
              onCreateOption={(v) => criarTag(setAtividadesTags, v)}
              placeholder="Selecionar atividade"
            />
            <CreatableSelect
              label="Status"
              value={form.status}
              onChange={(v) => setForm({ ...form, status: v })}
              options={statusTags}
              onCreateOption={(v) => criarTag(setStatusTags, v)}
              placeholder="Selecionar status"
            />
            <div>
              <Label>Tipo</Label>
              <Select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                <option>Progresso</option>
                <option>Não Conformidade</option>
                <option>Segurança</option>
                <option>Entrega</option>
              </Select>
            </div>
            <div>
              <Label>Responsável</Label>
              <Input value={form.responsavel} onChange={(e) => setForm({ ...form, responsavel: e.target.value })} />
            </div>
          </div>

          <p className="text-[11.5px] text-slate-500">
            Novas tipologias criadas aqui ficam disponíveis para toda a equipe; o administrador pode padronizá-las depois em Configurações.
          </p>
        </div>
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
