import { useState } from "react";
import {
  NotebookPen,
  CalendarRange,
  CalendarDays,
  Presentation,
  ShieldAlert,
  FileCheck2,
  Users,
  Download,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Obra } from "@/types";

const relatorios = [
  { icon: NotebookPen, titulo: "Diário de Obra", descricao: "Consolidado de RDOs no período selecionado." },
  { icon: CalendarRange, titulo: "Relatório Semanal", descricao: "Progresso, equipe e ocorrências da semana." },
  { icon: CalendarDays, titulo: "Relatório Mensal", descricao: "Visão consolidada mensal com indicadores." },
  { icon: Presentation, titulo: "Relatório Executivo", descricao: "Resumo estratégico para stakeholders." },
  { icon: ShieldAlert, titulo: "Não Conformidades", descricao: "Status e histórico de NCs da obra." },
  { icon: FileCheck2, titulo: "Medições", descricao: "Extrato de medições e aprovações." },
  { icon: Users, titulo: "Performance de Fornecedores", descricao: "Avaliação e ocorrências por fornecedor." },
];

export function RelatoriosObraTab({ obra }: { obra: Obra }) {
  const [gerando, setGerando] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {relatorios.map((r) => (
          <Card key={r.titulo} className="flex flex-col p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-brand-soft text-emerald-300">
              <r.icon className="h-5 w-5" />
            </div>
            <p className="mt-3.5 text-[14px] font-semibold text-slate-100">{r.titulo}</p>
            <p className="mt-1 flex-1 text-[12.5px] text-slate-500">{r.descricao}</p>
            <Button variant="outline" className="mt-4 w-full" onClick={() => setGerando(r.titulo)}>
              Gerar relatório
            </Button>
          </Card>
        ))}
      </div>

      <Modal open={!!gerando} onClose={() => setGerando(null)} title={gerando ?? ""} size="sm">
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand-soft">
            <Download className="h-6 w-6 text-emerald-400" />
          </div>
          <p className="text-[13.5px] text-slate-300">
            Relatório de <strong className="text-slate-100">{gerando}</strong> gerado para {obra.nome}.
          </p>
          <Button variant="primary" onClick={() => setGerando(null)}>
            Concluir
          </Button>
        </div>
      </Modal>
    </div>
  );
}
