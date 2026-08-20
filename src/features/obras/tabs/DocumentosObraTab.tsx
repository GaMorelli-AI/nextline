import { useState } from "react";
import { FileText, History } from "lucide-react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { getDocumentosByObra } from "@/mocks/documentos";
import type { Documento, Obra } from "@/types";

export function DocumentosObraTab({ obra }: { obra: Obra }) {
  const documentos = getDocumentosByObra(obra.id);
  const [selected, setSelected] = useState<Documento | null>(null);

  return (
    <div className="space-y-4">
      <Table>
        <Thead>
          <Tr>
            <Th>Documento</Th>
            <Th>Categoria</Th>
            <Th>Versão</Th>
            <Th>Responsável</Th>
            <Th>Atualização</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {documentos.map((doc) => (
            <Tr key={doc.id} onClick={() => setSelected(doc)}>
              <Td className="font-medium text-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-500" />
                  {doc.nome}
                </div>
              </Td>
              <Td>{doc.categoria}</Td>
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

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.nome} subtitle={selected?.categoria}>
        {selected && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={statusToTone(selected.status)}>{statusLabel(selected.status)}</Badge>
              <Badge tone="neutral">{selected.versao}</Badge>
              <Badge tone="neutral">{selected.tamanho}</Badge>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">
                <History className="h-3.5 w-3.5" /> Histórico de versões
              </h4>
              <div className="space-y-2.5">
                {["v1.0 · Publicação inicial", "v2.0 · Revisão técnica", `${selected.versao} · Versão atual`].map(
                  (v, i, arr) => (
                    <div
                      key={v}
                      className="flex items-center justify-between rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5"
                    >
                      <span className="text-[13px] text-slate-300">{v}</span>
                      {i === arr.length - 1 && <Badge tone="ok">Atual</Badge>}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <p className="text-[11.5px] text-slate-500">Responsável</p>
                <p className="mt-0.5 font-medium text-slate-200">{selected.responsavel}</p>
              </div>
              <div>
                <p className="text-[11.5px] text-slate-500">Última atualização</p>
                <p className="mt-0.5 font-medium text-slate-200">{selected.atualizacao}</p>
              </div>
            </div>
            <Button variant="primary" className="w-full">
              Baixar documento
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
