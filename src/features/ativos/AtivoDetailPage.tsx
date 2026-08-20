import { useParams, Navigate } from "react-router-dom";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge, statusToTone, statusLabel } from "@/components/ui/Badge";
import { FakeQrCode } from "@/components/ui/FakeQrCode";
import { Button } from "@/components/ui/Button";
import { getAtivoByCodigo } from "@/mocks/ativos";
import { formatCurrency } from "@/lib/utils";
import { FileText, Wrench, Download } from "lucide-react";

export function AtivoDetailPage() {
  const { codigo } = useParams();
  const ativo = codigo ? getAtivoByCodigo(codigo) : undefined;

  if (!ativo) return <Navigate to="/ativos" replace />;

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Ativos", href: "/ativos" }, { label: ativo.nome }]} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[12.5px] text-slate-500">{ativo.codigo}</p>
              <h1 className="mt-1 text-[22px] font-semibold tracking-tight text-slate-50">{ativo.nome}</h1>
              <p className="mt-1 text-[13px] text-slate-500">
                {ativo.fabricante} · Modelo {ativo.modelo}
              </p>
            </div>
            <Badge tone={statusToTone(ativo.estado)}>{statusLabel(ativo.estado)}</Badge>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
            <Field label="Categoria" value={ativo.categoria} />
            <Field label="Unidade" value={ativo.unidade} />
            <Field label="Valor do ativo" value={formatCurrency(ativo.valor)} />
            <Field label="Data de instalação" value={ativo.instalacao} />
            <Field label="Última inspeção" value={ativo.ultimaInspecao} />
            <Field label="Próxima manutenção" value={ativo.proximaManutencao} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink/[0.07] pt-5">
            <Button variant="secondary" icon={<FileText className="h-4 w-4" />}>
              8 documentos vinculados
            </Button>
            <Button variant="secondary" icon={<Wrench className="h-4 w-4" />}>
              3 ordens relacionadas
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">Identificação Patrimonial</p>
          <FakeQrCode value={ativo.codigo} size={144} />
          <p className="font-mono text-[13px] text-slate-300">{ativo.codigo}</p>
          <Button variant="outline" size="sm" icon={<Download className="h-3.5 w-3.5" />}>
            Baixar etiqueta
          </Button>
        </Card>
      </div>

      <Card>
        <CardHeader title="Histórico de Manutenção" subtitle="Últimas intervenções registradas" />
        <CardBody className="space-y-3">
          {[
            { tipo: "Manutenção Preventiva", data: ativo.ultimaInspecao, responsavel: "Facilities" },
            { tipo: "Inspeção Técnica", data: "22/11/2025", responsavel: "Facilities" },
            { tipo: "Manutenção Corretiva", data: "05/08/2025", responsavel: "Fornecedor Especializado" },
          ].map((h, i) => (
            <div key={i} className="flex items-center justify-between rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] px-4 py-3">
              <div className="flex items-center gap-3">
                <Wrench className="h-4 w-4 text-slate-500" />
                <span className="text-[13px] text-slate-200">{h.tipo}</span>
              </div>
              <div className="flex items-center gap-4 text-[12.5px] text-slate-500">
                <span>{h.responsavel}</span>
                <span className="text-slate-400">{h.data}</span>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-0.5 text-[13.5px] font-medium text-slate-200">{value}</p>
    </div>
  );
}
