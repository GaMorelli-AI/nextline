import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { contratos } from "@/mocks/contratosMedicoes";
import { formatCurrency } from "@/lib/utils";

export function ContratosPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ecossistema NextLine"
        title="Contratos"
        subtitle="Contratos ativos, vigências e valores sob gestão da NextLine."
        actions={
          <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
            Novo Contrato
          </Button>
        }
      />

      <div className="w-64">
        <Input icon={<Search className="h-4 w-4" />} placeholder="Buscar contrato ou cliente..." />
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Número</Th>
            <Th>Cliente</Th>
            <Th>Objeto</Th>
            <Th>Valor</Th>
            <Th>Vigência</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contratos.map((c) => (
            <Tr key={c.id} onClick={() => c.obraId && navigate(`/obras/${c.obraId}?tab=medicoes`)}>
              <Td className="font-semibold text-slate-100">{c.numero}</Td>
              <Td>{c.cliente}</Td>
              <Td className="max-w-xs truncate">{c.objeto}</Td>
              <Td>{formatCurrency(c.valor)}</Td>
              <Td className="whitespace-nowrap">
                {c.vigenciaInicio} — {c.vigenciaFim}
              </Td>
              <Td>
                <Badge tone={statusToTone(c.status)}>{statusLabel(c.status)}</Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
