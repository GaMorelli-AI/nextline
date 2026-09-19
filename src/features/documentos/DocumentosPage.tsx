import { useMemo, useState } from "react";
import { Search, FileText, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { documentos } from "@/mocks/documentos";
import { getObraById } from "@/mocks/obras";

export function DocumentosPage() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const categorias = useMemo(() => Array.from(new Set(documentos.map((d) => d.categoria))), []);

  const filtered = documentos.filter(
    (d) => (categoria === "todas" || d.categoria === categoria) && (!search || d.nome.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Projetos e Documentos"
        title="Central de Documentos"
        subtitle="Gerenciador documental centralizado com versionamento e rastreabilidade entre todas as obras."
        actions={
          <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
            Novo Documento
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="w-64">
          <Input icon={<Search className="h-4 w-4" />} placeholder="Buscar documento..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="todas">Categoria: Todas</option>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <span className="ml-auto text-[12.5px] text-slate-500">{filtered.length} documentos</span>
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Documento</Th>
            <Th>Categoria</Th>
            <Th>Obra vinculada</Th>
            <Th>Versão</Th>
            <Th>Responsável</Th>
            <Th>Atualização</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filtered.map((doc) => (
            <Tr key={doc.id}>
              <Td className="font-medium text-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-500" />
                  {doc.nome}
                </div>
              </Td>
              <Td>{doc.categoria}</Td>
              <Td>{doc.obraId ? getObraById(doc.obraId)?.nome : "—"}</Td>
              <Td>{doc.versao}</Td>
              <Td>{doc.responsavel}</Td>
              <Td className="whitespace-nowrap">{doc.atualizacao}</Td>
              <Td>
                <Badge tone={statusToTone(doc.status)}>{statusLabel(doc.status)}</Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
