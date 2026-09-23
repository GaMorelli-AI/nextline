import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, SlidersHorizontal, LayoutGrid, List as ListIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/Tabs";
import { Badge, statusLabel, statusToTone } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Avatar } from "@/components/ui/Avatar";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { Label, Input as TextInput, Select, Textarea } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { ObraCard } from "@/features/obras/ObraCard";
import { obras } from "@/mocks/obras";
import { criarDadosBaseObra } from "@/mocks/obraTemplate";
import type { Obra, StatusObra } from "@/types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const filters: { key: string; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "no-prazo", label: "No prazo" },
  { key: "atencao", label: "Atenção" },
  { key: "critico", label: "Críticas" },
  { key: "concluido", label: "Concluídas" },
];

export function ObrasListPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("todas");
  const [view, setView] = useState<"cards" | "tabela">("cards");
  const [search, setSearch] = useState("");
  const [novaObraOpen, setNovaObraOpen] = useState(false);
  const [obrasLocal, setObrasLocal] = useState(() => [...obras]);
  const [novoNome, setNovoNome] = useState("");
  const [novoCliente, setNovoCliente] = useState("");
  const [novoContrato, setNovoContrato] = useState("");
  const [novoResponsavel, setNovoResponsavel] = useState("");
  const [novoPrazo, setNovoPrazo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  function resetFormNovaObra() {
    setNovoNome("");
    setNovoCliente("");
    setNovoContrato("");
    setNovoResponsavel("");
    setNovoPrazo("");
    setNovaDescricao("");
  }

  function criarObra() {
    if (!novoNome.trim()) return;
    const base = slugify(novoNome);
    const id = obras.some((o) => o.id === base) ? `${base}-${Date.now()}` : base || `obra-${Date.now()}`;
    const hoje = new Date();
    const prazoFormatado = novoPrazo
      ? (() => {
          const [y, m, d] = novoPrazo.split("-").map(Number);
          return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
        })()
      : "—";
    const iniciais = novoResponsavel.trim()
      ? novoResponsavel
          .trim()
          .split(" ")
          .map((p) => p[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "—";

    const nova: Obra = {
      id,
      nome: novoNome.trim(),
      cliente: novoCliente.trim() || "—",
      contrato: novoContrato.trim() || "—",
      progresso: 0,
      progressoFinanceiro: 0,
      status: "no-prazo",
      prazo: prazoFormatado,
      inicio: `${String(hoje.getDate()).padStart(2, "0")}/${String(hoje.getMonth() + 1).padStart(2, "0")}/${hoje.getFullYear()}`,
      responsavel: novoResponsavel.trim() || "A definir",
      responsavelAvatar: iniciais,
      ncsAbertas: 0,
      ultimoRdo: "—",
      endereco: "",
      unidade: "",
      equipeHoje: 0,
      pendencias: 0,
      diasRestantes: 0,
      descricao: novaDescricao.trim(),
      valorContrato: 0,
    };

    obras.push(nova);
    criarDadosBaseObra(id);
    setObrasLocal([...obras]);
    setNovaObraOpen(false);
    resetFormNovaObra();
    navigate(`/obras/${id}`);
  }

  const filtered = useMemo(() => {
    return obrasLocal.filter((o) => {
      const matchesFilter = filter === "todas" || o.status === (filter as StatusObra);
      const matchesSearch =
        !search ||
        o.nome.toLowerCase().includes(search.toLowerCase()) ||
        o.cliente.toLowerCase().includes(search.toLowerCase()) ||
        o.responsavel.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [obrasLocal, filter, search]);

  const ativas = obrasLocal.filter((o) => o.status !== "concluido").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Gestão de Obras"
        title={`${ativas} Obras Ativas`}
        subtitle="Acompanhe cronograma, evidências, não conformidades e medições em um só lugar."
        actions={
          <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => setNovaObraOpen(true)}>
            Nova Obra
          </Button>
        }
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SegmentedControl
          options={filters.map((f) => ({ key: f.key, label: f.label }))}
          active={filter}
          onChange={setFilter}
        />
        <div className="flex items-center gap-2">
          <div className="w-56">
            <Input
              icon={<Search className="h-4 w-4" />}
              placeholder="Buscar obra, cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="md" icon={<SlidersHorizontal className="h-4 w-4" />}>
            Filtros
          </Button>
          <div className="h-6 w-px bg-ink/[0.08]" />
          <SegmentedControl
            options={[
              { key: "cards", label: <LayoutGrid className="h-4 w-4" /> },
              { key: "tabela", label: <ListIcon className="h-4 w-4" /> },
            ]}
            active={view}
            onChange={(v) => setView(v as "cards" | "tabela")}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search className="h-6 w-6" />}
          title="Nenhuma obra encontrada"
          description="Ajuste os filtros ou o termo de busca para encontrar a obra desejada."
        />
      ) : view === "cards" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((obra) => (
            <ObraCard key={obra.id} obra={obra} />
          ))}
        </div>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Obra</Th>
              <Th>Cliente</Th>
              <Th>Progresso</Th>
              <Th>Status</Th>
              <Th>Prazo</Th>
              <Th>Responsável</Th>
              <Th>NCs</Th>
              <Th>Último RDO</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map((obra) => (
              <Tr key={obra.id} onClick={() => navigate(`/obras/${obra.id}`)}>
                <Td className="font-medium text-slate-100">{obra.nome}</Td>
                <Td>{obra.cliente}</Td>
                <Td className="w-40">
                  <ProgressBar value={obra.progresso} showLabel size="sm" />
                </Td>
                <Td>
                  <Badge tone={statusToTone(obra.status)}>{statusLabel(obra.status)}</Badge>
                </Td>
                <Td>{obra.prazo}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Avatar initials={obra.responsavelAvatar} size="xs" />
                    {obra.responsavel}
                  </div>
                </Td>
                <Td>{obra.ncsAbertas}</Td>
                <Td className="whitespace-nowrap text-slate-400">{obra.ultimoRdo}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal
        open={novaObraOpen}
        onClose={() => {
          setNovaObraOpen(false);
          resetFormNovaObra();
        }}
        title="Nova Obra"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setNovaObraOpen(false);
                resetFormNovaObra();
              }}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={criarObra} disabled={!novoNome.trim()}>
              Criar Obra
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Nome da obra</Label>
            <TextInput placeholder="Ex: Reforma Unidade Norte" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
          </div>
          <div>
            <Label>Cliente</Label>
            <TextInput placeholder="Ex: CONFEA" value={novoCliente} onChange={(e) => setNovoCliente(e.target.value)} />
          </div>
          <div>
            <Label>Contrato</Label>
            <TextInput placeholder="Ex: 201/2026" value={novoContrato} onChange={(e) => setNovoContrato(e.target.value)} />
          </div>
          <div>
            <Label>Responsável técnico</Label>
            <Select value={novoResponsavel} onChange={(e) => setNovoResponsavel(e.target.value)}>
              <option value="" disabled>
                Selecionar responsável
              </option>
              <option>Geovanna Sena</option>
              <option>Rodrigo Almada</option>
              <option>Marcos Vinícius Prado</option>
              <option>Camila Duarte</option>
            </Select>
          </div>
          <div>
            <Label>Prazo previsto</Label>
            <TextInput type="date" value={novoPrazo} onChange={(e) => setNovoPrazo(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Label>Descrição</Label>
            <Textarea rows={3} placeholder="Escopo geral da obra..." value={novaDescricao} onChange={(e) => setNovaDescricao(e.target.value)} />
          </div>
          <div className="sm:col-span-2 rounded-[var(--radius-md)] bg-gradient-brand-soft p-3.5 text-[12px] text-slate-300">
            A NextLine já cria automaticamente um modelo-base: etapas padrão de cronograma, marcos críticos, categorias de
            projeto e checklist de documentos (ART/RRT/RT, contrato, memorial, liberação, seguro e laudos). Você pode remover
            o que não se aplica ou acrescentar algo específico depois.
          </div>
        </div>
      </Modal>
    </div>
  );
}
