import type { Contrato, Medicao } from "@/types";

export const contratos: Contrato[] = [
  { id: "ct1", numero: "171/2024", cliente: "CONFEA", objeto: "Reforma completa da Sala São Paulo", valor: 2840000, vigenciaInicio: "12/06/2025", vigenciaFim: "28/04/2026", status: "ativo", obraId: "sala-sp" },
  { id: "ct2", numero: "094/2025", cliente: "CREA-RJ", objeto: "Retrofit da sede histórica do CREA-RJ", valor: 5120000, vigenciaInicio: "03/02/2025", vigenciaFim: "15/11/2026", status: "ativo", obraId: "reforma-crea-rj" },
  { id: "ct3", numero: "233/2024", cliente: "Governo do Estado", objeto: "Construção do Centro Administrativo", valor: 18900000, vigenciaInicio: "18/09/2024", vigenciaFim: "30/06/2026", status: "ativo", obraId: "centro-administrativo" },
  { id: "ct4", numero: "045/2026", cliente: "New X Soluções", objeto: "Reforma corporativa do escritório SP", valor: 1230000, vigenciaInicio: "10/01/2026", vigenciaFim: "02/09/2026", status: "ativo", obraId: "reforma-escritorio-sp" },
  { id: "ct5", numero: "019/2026", cliente: "Banco Regional S.A.", objeto: "Reforma da Agência Central", valor: 980000, vigenciaInicio: "02/02/2026", vigenciaFim: "30/06/2026", status: "encerrado", obraId: "reforma-agencia-bancaria" },
  { id: "ct6", numero: "112/2025", cliente: "Kingline Engenharia", objeto: "Implantação do Pátio Logístico Duque de Caxias", valor: 26400000, vigenciaInicio: "22/07/2025", vigenciaFim: "10/03/2027", status: "ativo", obraId: "patio-logistico-rj" },
];

export const medicoes: Medicao[] = [
  { id: "md1", numero: "Medição #04", obraId: "sala-sp", valor: 184720, status: "aguardando", etapaAtual: 2, data: "24/03/2026" },
  { id: "md2", numero: "Medição #03", obraId: "sala-sp", valor: 210500, status: "aprovada", etapaAtual: 4, data: "24/02/2026" },
  { id: "md3", numero: "Medição #02", obraId: "sala-sp", valor: 198300, status: "aprovada", etapaAtual: 4, data: "24/01/2026" },
  { id: "md4", numero: "Medição #12", obraId: "reforma-crea-rj", valor: 412800, status: "aguardando", etapaAtual: 1, data: "20/03/2026" },
  { id: "md5", numero: "Medição #08", obraId: "centro-administrativo", valor: 890200, status: "aguardando", etapaAtual: 3, data: "18/03/2026" },
];

export const etapasAprovacao = ["Enviado", "Validação Técnica", "Gestor", "Financeiro", "Concluído"];

export const getMedicoesByObra = (obraId: string) => medicoes.filter((m) => m.obraId === obraId);
