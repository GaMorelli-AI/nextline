import type { AtividadeCronograma } from "@/types";

export const cronogramaPorObra: Record<string, AtividadeCronograma[]> = {
  "sala-sp": [
    { id: "c1", atividade: "Demolição e desmontagem", responsavel: "Equipe Civil A", inicio: "12/06/2025", fim: "30/07/2025", progresso: 100, status: "concluido", disciplina: "Civil" },
    { id: "c2", atividade: "Infraestrutura elétrica", responsavel: "ENGIX Engenharia", inicio: "01/08/2025", fim: "20/10/2025", progresso: 72, status: "atencao", disciplina: "Elétrica" },
    { id: "c3", atividade: "Instalação de eletrodutos rígidos", responsavel: "ENGIX Engenharia", inicio: "05/09/2025", fim: "15/11/2025", progresso: 58, status: "atrasado", disciplina: "Elétrica" },
    { id: "c4", atividade: "Piso elevado técnico", responsavel: "Equipe Civil B", inicio: "10/10/2025", fim: "05/01/2026", progresso: 64, status: "no-prazo", disciplina: "Civil" },
    { id: "c5", atividade: "Climatização (HVAC)", responsavel: "Climatiza Sul", inicio: "01/11/2025", fim: "10/02/2026", progresso: 38, status: "atencao", disciplina: "Climatização" },
    { id: "c6", atividade: "Forro e acabamentos", responsavel: "Equipe Civil A", inicio: "15/12/2025", fim: "20/03/2026", progresso: 21, status: "no-prazo", disciplina: "Civil" },
    { id: "c7", atividade: "Marcenaria e mobiliário", responsavel: "Marcenaria Fortes", inicio: "10/01/2026", fim: "10/04/2026", progresso: 12, status: "no-prazo", disciplina: "Marcenaria" },
    { id: "c8", atividade: "Comissionamento e entrega", responsavel: "Geovanna Sena", inicio: "01/04/2026", fim: "28/04/2026", progresso: 0, status: "no-prazo", disciplina: "Gestão" },
  ],
  "reforma-crea-rj": [
    { id: "c1", atividade: "Restauro de fachada", responsavel: "Restaura Patrimônio", inicio: "03/02/2025", fim: "20/06/2025", progresso: 100, status: "concluido", disciplina: "Civil" },
    { id: "c2", atividade: "Reforço estrutural", responsavel: "Equipe Estrutural", inicio: "01/05/2025", fim: "15/09/2025", progresso: 100, status: "concluido", disciplina: "Estrutural" },
    { id: "c3", atividade: "Instalações prediais", responsavel: "ENGIX Engenharia", inicio: "01/08/2025", fim: "30/11/2025", progresso: 88, status: "no-prazo", disciplina: "Elétrica" },
    { id: "c4", atividade: "Acessibilidade e rampas", responsavel: "Equipe Civil B", inicio: "01/10/2025", fim: "20/01/2026", progresso: 79, status: "no-prazo", disciplina: "Civil" },
    { id: "c5", atividade: "Acabamentos internos", responsavel: "Equipe Civil A", inicio: "10/12/2025", fim: "28/03/2026", progresso: 55, status: "no-prazo", disciplina: "Civil" },
    { id: "c6", atividade: "Paisagismo externo", responsavel: "Verde Paisagismo", inicio: "01/06/2026", fim: "15/09/2026", progresso: 0, status: "no-prazo", disciplina: "Paisagismo" },
  ],
  "centro-administrativo": [
    { id: "c1", atividade: "Fundações e contenções", responsavel: "Equipe Fundações", inicio: "18/09/2024", fim: "20/02/2025", progresso: 100, status: "concluido", disciplina: "Fundações" },
    { id: "c2", atividade: "Estrutura de concreto", responsavel: "Equipe Estrutural", inicio: "01/02/2025", fim: "30/09/2025", progresso: 61, status: "atrasado", disciplina: "Estrutural" },
    { id: "c3", atividade: "Vedações e alvenaria", responsavel: "Equipe Civil B", inicio: "01/07/2025", fim: "28/02/2026", progresso: 34, status: "atrasado", disciplina: "Civil" },
    { id: "c4", atividade: "Instalações elétricas e SPDA", responsavel: "ENGIX Engenharia", inicio: "01/10/2025", fim: "15/04/2026", progresso: 18, status: "atencao", disciplina: "Elétrica" },
    { id: "c5", atividade: "Climatização central", responsavel: "Climatiza Sul", inicio: "01/12/2025", fim: "20/05/2026", progresso: 9, status: "atencao", disciplina: "Climatização" },
  ],
};

export const getCronograma = (obraId: string) => cronogramaPorObra[obraId] ?? [];
