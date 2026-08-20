import type { Documento } from "@/types";

export const documentos: Documento[] = [
  { id: "d1", nome: "Contrato 171/2024 — Sala São Paulo", categoria: "Contratos", versao: "v1.0", responsavel: "Jurídico NextLine", atualizacao: "12/06/2025", status: "aprovado", obraId: "sala-sp", tamanho: "2,4 MB" },
  { id: "d2", nome: "Projeto Executivo Elétrico — Rev. C", categoria: "Projetos", versao: "v3.2", responsavel: "ENGIX Engenharia", atualizacao: "18/03/2026", status: "em-revisao", obraId: "sala-sp", tamanho: "18,1 MB" },
  { id: "d3", nome: "Laudo de Estanqueidade — Pavimento 2", categoria: "Laudos", versao: "v1.0", responsavel: "Rafael Tosta", atualizacao: "25/03/2026", status: "aprovado", obraId: "sala-sp", tamanho: "1,1 MB" },
  { id: "d4", nome: "ART — Responsável Técnico Elétrico", categoria: "ART/RRT", versao: "v1.0", responsavel: "ENGIX Engenharia", atualizacao: "02/08/2025", status: "aprovado", obraId: "sala-sp", tamanho: "320 KB" },
  { id: "d5", nome: "Medição Nº 04 — Sala São Paulo", categoria: "Medições", versao: "v1.0", responsavel: "Geovanna Sena", atualizacao: "24/03/2026", status: "pendente", obraId: "sala-sp", tamanho: "890 KB" },
  { id: "d6", nome: "Manual de Operação — Sistema HVAC", categoria: "Manuais", versao: "v1.0", responsavel: "Climatiza Sul", atualizacao: "10/02/2026", status: "aprovado", obraId: "sala-sp", tamanho: "6,7 MB" },
  { id: "d7", nome: "Relatório Mensal — Fevereiro 2026", categoria: "Relatórios", versao: "v1.0", responsavel: "Geovanna Sena", atualizacao: "01/03/2026", status: "aprovado", obraId: "sala-sp", tamanho: "3,2 MB" },
  { id: "d8", nome: "As Built — Instalações Hidráulicas", categoria: "As Built", versao: "v0.9", responsavel: "Equipe Civil A", atualizacao: "20/03/2026", status: "em-revisao", obraId: "sala-sp", tamanho: "14,5 MB" },
  { id: "d9", nome: "Contrato 094/2025 — Reforma CREA-RJ", categoria: "Contratos", versao: "v1.0", responsavel: "Jurídico NextLine", atualizacao: "03/02/2025", status: "aprovado", obraId: "reforma-crea-rj", tamanho: "2,1 MB" },
  { id: "d10", nome: "Laudo de Restauro — Fachada Histórica", categoria: "Laudos", versao: "v2.0", responsavel: "Restaura Patrimônio", atualizacao: "18/06/2025", status: "aprovado", obraId: "reforma-crea-rj", tamanho: "9,8 MB" },
  { id: "d11", nome: "ART — Restauro Estrutural", categoria: "ART/RRT", versao: "v1.0", responsavel: "Restaura Patrimônio", atualizacao: "05/05/2025", status: "vencido", obraId: "reforma-crea-rj", tamanho: "290 KB" },
  { id: "d12", nome: "Contrato 233/2024 — Centro Administrativo", categoria: "Contratos", versao: "v1.1", responsavel: "Jurídico NextLine", atualizacao: "18/09/2024", status: "aprovado", obraId: "centro-administrativo", tamanho: "3,0 MB" },
  { id: "d13", nome: "Projeto Estrutural — Bloco D", categoria: "Projetos", versao: "v4.0", responsavel: "Estrutural Prime", atualizacao: "22/01/2026", status: "em-revisao", obraId: "centro-administrativo", tamanho: "22,3 MB" },
  { id: "d14", nome: "Relatório Executivo — Q1 2026", categoria: "Relatórios", versao: "v1.0", responsavel: "Marcos Vinícius Prado", atualizacao: "31/03/2026", status: "aprovado", tamanho: "4,4 MB" },
];

export const getDocumentosByObra = (obraId: string) => documentos.filter((d) => d.obraId === obraId);
