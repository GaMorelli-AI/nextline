import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckSquare, FileWarning, Truck, HardHat, FolderKanban, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input, Select } from "@/components/ui/Input";
import { pendencias } from "@/mocks/demoObra";
import { getObraById } from "@/mocks/obras";
import type { CategoriaPendencia, StatusPendencia } from "@/types";

const categoriaIcon: Record<CategoriaPendencia, typeof CheckSquare> = {
  aprovacao: CheckSquare,
  documento: FileWarning,
  fornecedor: Truck,
  obra: HardHat,
  projeto: FolderKanban,
};

const categoriaLabel: Record<CategoriaPendencia, string> = {
  aprovacao: "Aprovação",
  documento: "Documento",
  fornecedor: "Fornecedor",
  obra: "Obra",
  projeto: "Projeto",
};

const statusTone: Record<StatusPendencia, "ok" | "warn" | "critical" | "info" | "neutral"> = {
  aberto: "critical",
  "em-andamento": "info",
  "aguardando-terceiro": "warn",
  resolvido: "ok",
  vencido: "critical",
};

const statusLabelMap: Record<StatusPendencia, string> = {
  aberto: "Aberto",
  "em-andamento": "Em andamento",
  "aguardando-terceiro": "Aguardando terceiro",
  resolvido: "Resolvido",
  vencido: "Vencido",
};

export function PendenciasPage() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<string>("todas");
  const [status, setStatus] = useState<string>("todas");
  const [search, setSearch] = useState("");

  const filtradas = useMemo(
    () =>
      pendencias.filter(
        (p) =>
          (categoria === "todas" || p.categoria === categoria) &&
          (status === "todas" || p.status === status) &&
          (!search || p.titulo.toLowerCase().includes(search.toLowerCase()))
      ),
    [categoria, status, search]
  );

  const abertas = pendencias.filter((p) => p.status !== "resolvido").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Próxima ação"
        title="Pendências"
        subtitle={`${abertas} pendências exigem alguma ação — aprovações, documentos, fornecedores e projetos.`}
      />

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="w-56">
          <Input icon={<Search className="h-4 w-4" />} placeholder="Buscar pendência..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="todas">Categoria: Todas</option>
          {Object.entries(categoriaLabel).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todas">Status: Todos</option>
          {Object.entries(statusLabelMap).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </Select>
        <span className="ml-auto text-[12.5px] text-slate-500">{filtradas.length} resultados</span>
      </div>

      <div className="space-y-3">
        {filtradas.map((p) => {
          const Icon = categoriaIcon[p.categoria];
          const obra = getObraById(p.obraId);
          return (
            <Card
              key={p.id}
              hoverable
              onClick={() => navigate(`/obras/${p.obraId}?tab=pendencias`)}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-brand-soft text-brand-blue">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-slate-100">{p.titulo}</p>
                    <Badge tone="neutral">{categoriaLabel[p.categoria]}</Badge>
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-slate-400">{p.descricao}</p>
                  <p className="mt-1 text-[11.5px] text-slate-500">
                    {obra?.nome} {p.ambiente && `· ${p.ambiente}`} {p.prazo && `· Prazo: ${p.prazo}`}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 pl-13 sm:pl-0">
                <Badge tone={statusTone[p.status]}>{statusLabelMap[p.status]}</Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
