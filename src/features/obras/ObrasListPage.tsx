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
import type { StatusObra } from "@/types";

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

  const filtered = useMemo(() => {
    return obras.filter((o) => {
      const matchesFilter = filter === "todas" || o.status === (filter as StatusObra);
      const matchesSearch =
        !search ||
        o.nome.toLowerCase().includes(search.toLowerCase()) ||
        o.cliente.toLowerCase().includes(search.toLowerCase()) ||
        o.responsavel.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const ativas = obras.filter((o) => o.status !== "concluido").length;

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
        onClose={() => setNovaObraOpen(false)}
        title="Nova Obra"
        footer={
          <>
            <Button variant="ghost" onClick={() => setNovaObraOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setNovaObraOpen(false)}>
              Criar Obra
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Nome da obra</Label>
            <TextInput placeholder="Ex: Reforma Unidade Norte" />
          </div>
          <div>
            <Label>Cliente</Label>
            <TextInput placeholder="Ex: CONFEA" />
          </div>
          <div>
            <Label>Contrato</Label>
            <TextInput placeholder="Ex: 201/2026" />
          </div>
          <div>
            <Label>Responsável técnico</Label>
            <Select defaultValue="">
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
            <TextInput type="date" />
          </div>
          <div className="sm:col-span-2">
            <Label>Descrição</Label>
            <Textarea rows={3} placeholder="Escopo geral da obra..." />
          </div>
        </div>
      </Modal>
    </div>
  );
}
