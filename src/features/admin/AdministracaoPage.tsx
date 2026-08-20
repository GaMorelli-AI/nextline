import { useState, type ReactNode } from "react";
import { Check, X, Minus, Users2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const perfis = ["Administrador", "Gestor", "Engenheiro", "Fiscal", "Fornecedor", "Cliente"];

const modulos = [
  "Visão Geral",
  "Gestão de Obras",
  "Patrimônio",
  "Ativos",
  "Facilities",
  "Documentos",
  "Contratos",
  "Fornecedores",
  "BIM",
  "Analytics",
  "Administração",
];

type Nivel = "total" | "parcial" | "nenhum";

function nivelFor(modulo: string, perfil: string): Nivel {
  if (perfil === "Administrador") return "total";
  if (perfil === "Cliente") return modulo === "Gestão de Obras" || modulo === "Patrimônio" ? "parcial" : "nenhum";
  if (perfil === "Fornecedor") return modulo === "Gestão de Obras" || modulo === "Documentos" ? "parcial" : "nenhum";
  if (perfil === "Fiscal") return ["Gestão de Obras", "Documentos", "Ativos"].includes(modulo) ? "total" : modulo === "Analytics" ? "parcial" : "nenhum";
  if (perfil === "Engenheiro") return modulo === "Administração" ? "nenhum" : modulo === "Analytics" ? "parcial" : "total";
  if (perfil === "Gestor") return modulo === "Administração" ? "parcial" : "total";
  return "nenhum";
}

const nivelIcon: Record<Nivel, ReactNode> = {
  total: <Check className="h-3.5 w-3.5 text-[var(--color-status-ok)]" />,
  parcial: <Minus className="h-3.5 w-3.5 text-[var(--color-status-warn)]" />,
  nenhum: <X className="h-3.5 w-3.5 text-slate-600" />,
};

const usuarios = [
  { nome: "Gabriel Morelli", email: "gabriel@newxsolutions.com.br", perfil: "Administrador", iniciais: "GM" },
  { nome: "Geovanna Sena", email: "geovanna.sena@kingline.com.br", perfil: "Engenheiro", iniciais: "GS" },
  { nome: "Marcos Vinícius Prado", email: "marcos.prado@kingline.com.br", perfil: "Gestor", iniciais: "MP" },
  { nome: "Rafael Tosta", email: "rafael.tosta@kingline.com.br", perfil: "Fiscal", iniciais: "RT" },
  { nome: "ENGIX Engenharia", email: "contato@engix.com.br", perfil: "Fornecedor", iniciais: "EE" },
];

export function AdministracaoPage() {
  const [tab, setTab] = useState<"perfis" | "usuarios">("perfis");

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administração" title="Perfis e Permissões" subtitle="Controle de acesso e papéis dentro da plataforma NextLine." />

      <div className="inline-flex rounded-[var(--radius-sm)] bg-ink/[0.05] p-1">
        <button onClick={() => setTab("perfis")} className={cn("rounded-[6px] px-3.5 py-1.5 text-[13px] font-medium", tab === "perfis" ? "bg-navy-600 text-slate-50" : "text-slate-400")}>
          Matriz de Permissões
        </button>
        <button onClick={() => setTab("usuarios")} className={cn("rounded-[6px] px-3.5 py-1.5 text-[13px] font-medium", tab === "usuarios" ? "bg-navy-600 text-slate-50" : "text-slate-400")}>
          Usuários
        </button>
      </div>

      {tab === "perfis" ? (
        <Card>
          <CardHeader title="Matriz de Permissões" subtitle="Nível de acesso por perfil e módulo" />
          <CardBody className="overflow-x-auto scrollbar-thin p-0">
            <table className="w-full min-w-[820px] border-collapse text-[12.5px]">
              <thead>
                <tr className="border-b border-ink/[0.07]">
                  <th className="px-5 py-3 text-left font-semibold uppercase tracking-wider text-[11px] text-slate-500">Módulo</th>
                  {perfis.map((p) => (
                    <th key={p} className="px-3 py-3 text-center font-semibold uppercase tracking-wider text-[11px] text-slate-500">
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/[0.06]">
                {modulos.map((m) => (
                  <tr key={m}>
                    <td className="px-5 py-3 font-medium text-slate-200">{m}</td>
                    {perfis.map((p) => (
                      <td key={p} className="px-3 py-3 text-center">
                        <span className="inline-flex">{nivelIcon[nivelFor(m, p)]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
          <div className="flex items-center gap-5 border-t border-ink/[0.07] px-5 py-3.5 text-[11.5px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[var(--color-status-ok)]" /> Acesso total
            </span>
            <span className="flex items-center gap-1.5">
              <Minus className="h-3.5 w-3.5 text-[var(--color-status-warn)]" /> Acesso parcial
            </span>
            <span className="flex items-center gap-1.5">
              <X className="h-3.5 w-3.5 text-slate-600" /> Sem acesso
            </span>
          </div>
        </Card>
      ) : (
        <Card>
          <CardHeader title="Usuários" subtitle="Colaboradores e parceiros com acesso à plataforma" action={<Users2 className="h-4 w-4 text-slate-500" />} />
          <CardBody className="space-y-2.5">
            {usuarios.map((u) => (
              <div key={u.email} className="flex items-center justify-between rounded-[var(--radius-md)] border border-ink/10 bg-ink/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar initials={u.iniciais} size="sm" />
                  <div>
                    <p className="text-[13px] font-medium text-slate-100">{u.nome}</p>
                    <p className="text-[11.5px] text-slate-500">{u.email}</p>
                  </div>
                </div>
                <Badge tone="neutral">{u.perfil}</Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      )}
    </div>
  );
}
