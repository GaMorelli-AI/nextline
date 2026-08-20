import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, QrCode } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input, Select } from "@/components/ui/Input";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { ativos } from "@/mocks/ativos";

export function AtivosPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("todas");

  const categorias = useMemo(() => Array.from(new Set(ativos.map((a) => a.categoria))), []);

  const filtered = ativos.filter(
    (a) =>
      (categoria === "todas" || a.categoria === categoria) &&
      (!search || a.nome.toLowerCase().includes(search.toLowerCase()) || a.codigo.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Gestão Patrimonial"
        title="Ativos"
        subtitle="Inventário completo de ativos físicos monitorados pela plataforma."
      />

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="w-64">
          <Input icon={<Search className="h-4 w-4" />} placeholder="Buscar por código ou nome..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="todas">Categoria: Todas</option>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <span className="ml-auto text-[12.5px] text-slate-500">{filtered.length} ativos</span>
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Código</Th>
            <Th>Ativo</Th>
            <Th>Categoria</Th>
            <Th>Unidade</Th>
            <Th>Estado</Th>
            <Th>Última Inspeção</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {filtered.map((a) => (
            <Tr key={a.codigo} onClick={() => navigate(`/ativos/${a.codigo}`)}>
              <Td className="font-mono text-[12.5px] text-slate-400">{a.codigo}</Td>
              <Td className="font-medium text-slate-100">{a.nome}</Td>
              <Td>{a.categoria}</Td>
              <Td>{a.unidade}</Td>
              <Td>
                <Badge tone={statusToTone(a.estado)}>{statusLabel(a.estado)}</Badge>
              </Td>
              <Td className="whitespace-nowrap">{a.ultimaInspecao}</Td>
              <Td>
                <QrCode className="h-4 w-4 text-slate-600" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
