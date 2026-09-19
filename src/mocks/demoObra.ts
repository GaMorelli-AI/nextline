// Fonte única e consistente de dados para a obra-demonstração "Residencial Jardins".
// Todos os módulos (Cronograma, Agenda, Projetos, Compras, Pendências, Meu Dia,
// Timeline etc.) leem daqui para que uma mudança em um módulo se reflita nos demais.
import type {
  Ambiente,
  AprovacaoCliente,
  DocumentoObra,
  EventoAgenda,
  EventoTimeline,
  GrupoCotacao,
  Milestone,
  Pendencia,
  PedidoFechado,
  ProjetoRevisao,
  TarefaCronograma,
  VisitaChecklist,
} from "@/types";

export const OBRA_DEMO_ID = "residencial-jardins";

export const ambientes: Ambiente[] = [
  { id: "amb-sala", obraId: OBRA_DEMO_ID, nome: "Sala" },
  { id: "amb-cozinha", obraId: OBRA_DEMO_ID, nome: "Cozinha" },
  { id: "amb-suite-master", obraId: OBRA_DEMO_ID, nome: "Suíte Master" },
  { id: "amb-suite-02", obraId: OBRA_DEMO_ID, nome: "Suíte 02" },
  { id: "amb-banheiro", obraId: OBRA_DEMO_ID, nome: "Banheiro" },
  { id: "amb-varanda", obraId: OBRA_DEMO_ID, nome: "Varanda" },
  { id: "amb-area-servico", obraId: OBRA_DEMO_ID, nome: "Área de Serviço" },
];

export const milestones: Milestone[] = [
  { id: "ms-liberacao-estrutural", obraId: OBRA_DEMO_ID, nome: "Liberação estrutural", dataPrevista: "10/04/2026", status: "concluido" },
  { id: "ms-aprovacao-projeto", obraId: OBRA_DEMO_ID, nome: "Aprovação de projeto", dataPrevista: "18/06/2026", status: "concluido" },
  { id: "ms-liberacao-producao", obraId: OBRA_DEMO_ID, nome: "Liberação para produção", dataPrevista: "05/08/2026", status: "concluido" },
  { id: "ms-medicao", obraId: OBRA_DEMO_ID, nome: "Medição", dataPrevista: "10/09/2026", status: "no-prazo" },
  {
    id: "ms-liberacao-marcenaria",
    obraId: OBRA_DEMO_ID,
    nome: "Liberação de marcenaria",
    dataPrevista: "25/10/2026",
    status: "risco",
    descricaoRisco: "Dependências atuais ultrapassam o marco em 6 dias.",
    diasRisco: 6,
  },
  { id: "ms-entrega-obra", obraId: OBRA_DEMO_ID, nome: "Entrega da obra", dataPrevista: "20/12/2026", status: "no-prazo" },
];

/* Cronograma: macroatividade "Marcenaria" com subfluxo completo e cadeia de
   predecessoras. As demais disciplinas ficam como atividades de nível único. */
export const tarefasCronograma: TarefaCronograma[] = [
  // Estrutura (concluída)
  { id: "t-estrutura", obraId: OBRA_DEMO_ID, nome: "Estrutura e fundação", disciplina: "Estrutural", responsavel: "Equipe Estrutural", inicio: "05/02/2026", fim: "10/04/2026", progresso: 100, status: "concluido", isMilestone: false, visivelCliente: true },
  { id: "t-alvenaria", obraId: OBRA_DEMO_ID, nome: "Alvenaria e vedações", disciplina: "Civil", responsavel: "Equipe Civil A", inicio: "11/04/2026", fim: "20/06/2026", progresso: 100, status: "concluido", predecessoras: ["t-estrutura"], visivelCliente: true },
  { id: "t-eletrica", obraId: OBRA_DEMO_ID, nome: "Instalações elétricas", disciplina: "Elétrica", responsavel: "ENGIX Engenharia", fornecedor: "ENGIX Engenharia", inicio: "01/06/2026", fim: "15/08/2026", progresso: 88, status: "no-prazo", predecessoras: ["t-alvenaria"], visivelCliente: true, visivelFornecedorId: "engix" },
  { id: "t-hidraulica", obraId: OBRA_DEMO_ID, nome: "Instalações hidráulicas", disciplina: "Hidráulica", responsavel: "Equipe Hidráulica", inicio: "01/06/2026", fim: "10/08/2026", progresso: 90, status: "no-prazo", predecessoras: ["t-alvenaria"], visivelCliente: true },

  // Marcenaria — macroatividade com subfluxo
  { id: "t-marcenaria", obraId: OBRA_DEMO_ID, nome: "Marcenaria", disciplina: "Marcenaria", responsavel: "Marcenaria Fortes", fornecedor: "Marcenaria Fortes", inicio: "18/06/2026", fim: "25/10/2026", progresso: 58, status: "atencao", ambiente: "Cozinha", visivelCliente: true, visivelFornecedorId: "marcenaria-fortes" },
  { id: "t-marc-projeto", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Projeto", disciplina: "Marcenaria", responsavel: "Marcenaria Fortes", inicio: "18/06/2026", fim: "02/07/2026", progresso: 100, status: "concluido" },
  { id: "t-marc-orcamento", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Orçamento", disciplina: "Marcenaria", responsavel: "Marcenaria Fortes", inicio: "03/07/2026", fim: "10/07/2026", progresso: 100, status: "concluido", predecessoras: ["t-marc-projeto"] },
  { id: "t-marc-cotacao", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Cotação", disciplina: "Marcenaria", responsavel: "Fernanda Almeida", inicio: "11/07/2026", fim: "18/07/2026", progresso: 100, status: "concluido", predecessoras: ["t-marc-orcamento"] },
  { id: "t-marc-aprovacao", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Aprovação", disciplina: "Marcenaria", responsavel: "Cliente", inicio: "19/07/2026", fim: "13/09/2026", progresso: 100, status: "atrasado", predecessoras: ["t-marc-cotacao"] },
  { id: "t-marc-pedido", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Pedido", disciplina: "Marcenaria", responsavel: "Marcenaria Fortes", inicio: "14/09/2026", fim: "18/09/2026", progresso: 100, status: "concluido", predecessoras: ["t-marc-aprovacao"] },
  { id: "t-marc-medicao", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Medição", disciplina: "Marcenaria", responsavel: "Marcenaria Fortes", inicio: "10/09/2026", fim: "10/09/2026", progresso: 0, status: "no-prazo", predecessoras: ["t-marc-pedido"], isMilestone: true },
  { id: "t-marc-producao", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Produção", disciplina: "Marcenaria", responsavel: "Marcenaria Fortes", inicio: "19/09/2026", fim: "24/10/2026", progresso: 35, status: "atencao", predecessoras: ["t-marc-medicao"] },
  { id: "t-marc-entrega", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Entrega", disciplina: "Marcenaria", responsavel: "Marcenaria Fortes", inicio: "25/10/2026", fim: "28/10/2026", progresso: 0, status: "atencao", predecessoras: ["t-marc-producao"] },
  { id: "t-marc-instalacao", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Instalação", disciplina: "Marcenaria", responsavel: "Marcenaria Fortes", inicio: "29/10/2026", fim: "05/11/2026", progresso: 0, status: "atencao", predecessoras: ["t-marc-entrega"] },
  { id: "t-marc-conferencia", obraId: OBRA_DEMO_ID, parentId: "t-marcenaria", nome: "Conferência", disciplina: "Marcenaria", responsavel: "Fernanda Almeida", inicio: "06/11/2026", fim: "08/11/2026", progresso: 0, status: "atencao", predecessoras: ["t-marc-instalacao"] },

  // Vidraçaria
  { id: "t-vidracaria", obraId: OBRA_DEMO_ID, nome: "Vidraçaria", disciplina: "Vidraçaria", responsavel: "Vidraçaria Cristal", fornecedor: "Vidraçaria Cristal", inicio: "20/08/2026", fim: "15/11/2026", progresso: 22, status: "atencao", ambiente: "Suíte Master", visivelCliente: true, visivelFornecedorId: "vidracaria-cristal" },

  // Pintura e acabamento
  { id: "t-pintura", obraId: OBRA_DEMO_ID, nome: "Pintura e acabamento", disciplina: "Civil", responsavel: "Pintura Renove", fornecedor: "Pintura Renove", inicio: "01/10/2026", fim: "01/12/2026", progresso: 15, status: "no-prazo", predecessoras: ["t-eletrica", "t-hidraulica"], visivelCliente: true },

  // Automação
  { id: "t-automacao", obraId: OBRA_DEMO_ID, nome: "Automação residencial", disciplina: "Elétrica", responsavel: "Automação SmartHome", fornecedor: "Automação SmartHome", inicio: "15/10/2026", fim: "05/12/2026", progresso: 5, status: "no-prazo", predecessoras: ["t-eletrica"], visivelCliente: true },

  // Comissionamento final
  { id: "t-entrega-final", obraId: OBRA_DEMO_ID, nome: "Comissionamento e entrega", disciplina: "Gestão", responsavel: "Fernanda Almeida", inicio: "06/12/2026", fim: "20/12/2026", progresso: 0, status: "no-prazo", predecessoras: ["t-marc-conferencia", "t-pintura", "t-automacao"], isMilestone: true, visivelCliente: true },
];

/* Agenda — eventos de hoje + próximos, incluindo o exemplo de medição de marmoraria */
export const eventosAgenda: EventoAgenda[] = [
  { id: "ag-pintor", obraId: OBRA_DEMO_ID, titulo: "Pintor — Retoques sala", data: "10/09/2026", horario: "09:00", ambiente: "Sala", objetivo: "Retoques de pintura após instalação elétrica", responsavel: "Pintura Renove", status: "confirmado" },
  { id: "ag-marmoraria", obraId: OBRA_DEMO_ID, titulo: "Marmoraria — Medição cozinha", data: "10/09/2026", horario: "11:00", ambiente: "Cozinha", objetivo: "Medição da bancada", responsavel: "Marmoraria Alfa", fornecedorId: "marmoraria-alfa", status: "aguardando-confirmacao" },
  { id: "ag-automacao", obraId: OBRA_DEMO_ID, titulo: "Automação — Instalação", data: "10/09/2026", horario: "14:30", ambiente: "Sala", objetivo: "Instalação de central de automação", responsavel: "Automação SmartHome", status: "confirmado" },
  { id: "ag-marcenaria-vistoria", obraId: OBRA_DEMO_ID, titulo: "Marcenaria — Vistoria", data: "10/09/2026", horario: "16:00", ambiente: "Cozinha", objetivo: "Conferir instalação de marmoraria e furação", responsavel: "Marcelo Duarte", status: "confirmado" },
  { id: "ag-vidracaria", obraId: OBRA_DEMO_ID, titulo: "Vidraçaria — Visita técnica", data: "11/09/2026", horario: "10:00", ambiente: "Suíte Master", objetivo: "Confirmar medidas do box", responsavel: "Vidraçaria Cristal", fornecedorId: "vidracaria-cristal", status: "aguardando-confirmacao" },
  {
    id: "ag-marmoraria-nao-compareceu",
    obraId: OBRA_DEMO_ID,
    titulo: "Marmoraria — Agendamento",
    data: "09/09/2026",
    horario: "09:00",
    ambiente: "Cozinha",
    objetivo: "Medição preliminar da bancada",
    responsavel: "Marmoraria Alfa",
    fornecedorId: "marmoraria-alfa",
    status: "nao-compareceu",
    observacoes: "Fornecedor não compareceu. Reagendado para 10/09.",
  },
];

/* Projetos e revisões */
export const projetosRevisao: ProjetoRevisao[] = [
  { id: "proj-marc-04", obraId: OBRA_DEMO_ID, categoria: "Marcenaria", nome: "Projeto Marcenaria — Cozinha", revisao: "REV 04", versaoVigente: true, data: "18/07/2026", responsavel: "Marcenaria Fortes", aprovadoPor: "Fernanda Almeida", status: "aprovado", origem: "nextline" },
  { id: "proj-marc-03", obraId: OBRA_DEMO_ID, categoria: "Marcenaria", nome: "Projeto Marcenaria — Cozinha", revisao: "REV 03", versaoVigente: false, data: "02/07/2026", responsavel: "Marcenaria Fortes", status: "substituido", origem: "nextline" },
  { id: "proj-marc-02", obraId: OBRA_DEMO_ID, categoria: "Marcenaria", nome: "Projeto Marcenaria — Cozinha", revisao: "REV 02", versaoVigente: false, data: "20/06/2026", responsavel: "Marcenaria Fortes", status: "substituido", origem: "nextline" },
  { id: "proj-executivo-01", obraId: OBRA_DEMO_ID, categoria: "Executivo", nome: "Projeto Executivo Geral", revisao: "REV 02", versaoVigente: true, data: "15/05/2026", responsavel: "Escritório de Arquitetura", aprovadoPor: "Fernanda Almeida", status: "aprovado", origem: "nextline" },
  { id: "proj-eletrica-01", obraId: OBRA_DEMO_ID, categoria: "Elétrica", nome: "Projeto Elétrico e Automação", revisao: "REV 03", versaoVigente: true, data: "30/06/2026", responsavel: "ENGIX Engenharia", aprovadoPor: "Fernanda Almeida", status: "aprovado", origem: "integracao-externa" },
  { id: "proj-vidracaria-01", obraId: OBRA_DEMO_ID, categoria: "Vidraçaria", nome: "Projeto Vidraçaria — Suíte Master", revisao: "REV 01", versaoVigente: true, data: "10/08/2026", responsavel: "Vidraçaria Cristal", status: "em-revisao", observacoes: "Aguardando ajuste de medidas do box.", origem: "nextline" },
];

/* Documentos / checklist de abertura de obra */
export const documentosObra: DocumentoObra[] = [
  { id: "doc-art", obraId: OBRA_DEMO_ID, nome: "ART do responsável técnico", categoria: "ART / RRT / RT", grupo: "imprescindivel", status: "validado", validadeAte: "30/11/2026", responsavel: "Fernanda Almeida", iaResultado: { validado: true, checks: ["Documento assinado", "Responsável identificado", "Obra identificada", "Dados compatíveis com cadastro", "Dentro da validade"] } },
  { id: "doc-liberacao", obraId: OBRA_DEMO_ID, nome: "Liberação da obra", categoria: "Liberação", grupo: "imprescindivel", status: "validado", validadeAte: "30/11/2026", responsavel: "Fernanda Almeida" },
  { id: "doc-contrato", obraId: OBRA_DEMO_ID, nome: "Contrato OBR-2026-014", categoria: "Contrato", grupo: "imprescindivel", status: "validado", responsavel: "Jurídico NextLine" },
  { id: "doc-memorial", obraId: OBRA_DEMO_ID, nome: "Memorial descritivo", categoria: "Memorial", grupo: "imprescindivel", status: "requer-revisao", responsavel: "Escritório de Arquitetura", iaResultado: { validado: false, checks: ["Documento identificado"], alerta: "Assinatura não encontrada." } },
  { id: "doc-seguro", obraId: OBRA_DEMO_ID, nome: "Apólice de seguro da obra", categoria: "Seguro", grupo: "comum", status: "aguardando-validacao", validadeAte: "28/09/2026", responsavel: "Corretora Segura+" },
  { id: "doc-laudo-estrutural", obraId: OBRA_DEMO_ID, nome: "Laudo estrutural", categoria: "Laudo", grupo: "comum", status: "validado", responsavel: "Equipe Estrutural" },
  { id: "doc-condominio", obraId: OBRA_DEMO_ID, nome: "Documentação do condomínio", categoria: "Outros", grupo: "comum", status: "nao-aplicavel", responsavel: "Fernanda Almeida" },
  { id: "doc-art-vidracaria", obraId: OBRA_DEMO_ID, nome: "ART — Instalação de vidraçaria", categoria: "ART / RRT / RT", grupo: "condicional", status: "nao-enviado", responsavel: "Vidraçaria Cristal" },
];

/* Compras — grupo de cotações (exemplo do prompt: vidraçaria do box da suíte master) */
export const gruposCotacao: GrupoCotacao[] = [
  {
    id: "cot-vidracaria-box",
    obraId: OBRA_DEMO_ID,
    itemNome: "Vidraçaria — Box Suíte Master",
    ambiente: "Suíte Master",
    cotacoes: [
      { fornecedor: "Fornecedor Alfa", valor: 18200, prazoDiasUteis: 35 },
      { fornecedor: "Fornecedor Beta", valor: 19100, prazoDiasUteis: 28 },
      { fornecedor: "Fornecedor Gama", valor: 17850, prazoDiasUteis: 42 },
    ],
    dataInstalacaoNecessaria: "30/10/2026",
    prazoMedicaoDias: 7,
    status: "aprovacao-cliente",
  },
  {
    id: "cot-bancada-cozinha",
    obraId: OBRA_DEMO_ID,
    itemNome: "Bancada de mármore — Cozinha",
    ambiente: "Cozinha",
    cotacoes: [
      { fornecedor: "Marmoraria Alfa", valor: 12400, prazoDiasUteis: 20 },
      { fornecedor: "Marmoraria Beta", valor: 13850, prazoDiasUteis: 15 },
    ],
    escolhida: "Marmoraria Alfa",
    dataInstalacaoNecessaria: "25/10/2026",
    prazoMedicaoDias: 5,
    status: "fechado",
  },
];

export const aprovacoesCliente: AprovacaoCliente[] = [
  {
    id: "apr-vidracaria",
    obraId: OBRA_DEMO_ID,
    titulo: "Vidraçaria da suíte",
    ambiente: "Suíte Master",
    propostas: 3,
    prazo: "10/09/2026",
    solicitadoEm: "05/09/2026 — 14:32",
    visualizadoEm: "06/09/2026",
    status: "aguardando",
  },
  {
    id: "apr-marcenaria",
    obraId: OBRA_DEMO_ID,
    titulo: "Marcenaria da cozinha",
    ambiente: "Cozinha",
    propostas: 1,
    prazo: "10/09/2026",
    solicitadoEm: "16/07/2026 — 09:10",
    visualizadoEm: "17/07/2026",
    aprovadoEm: "13/09/2026",
    atrasoDias: 3,
    status: "aprovado",
  },
];

export const pedidosFechados: PedidoFechado[] = [
  {
    id: "ped-marmoraria",
    obraId: OBRA_DEMO_ID,
    itemNome: "Bancada de mármore — Cozinha",
    fornecedor: "Marmoraria Alfa",
    valor: 12400,
    dataFechamento: "20/08/2026",
    prazoProducaoDias: 20,
    dataInstalacaoPrevista: "10/09/2026",
    projetoRelacionado: "Projeto Marcenaria — Cozinha — REV 04 — VERSÃO VIGENTE",
    status: "producao",
  },
];

/* Pendências */
export const pendencias: Pendencia[] = [
  { id: "pend-vidracaria", obraId: OBRA_DEMO_ID, categoria: "aprovacao", titulo: "Aprovação da vidraçaria", descricao: "Cliente precisa aprovar a vidraçaria da suíte master.", prazo: "amanhã", responsavel: "Família Castellani", criticidade: "alta", status: "aberto", ambiente: "Suíte Master" },
  { id: "pend-seguro", obraId: OBRA_DEMO_ID, categoria: "documento", titulo: "Seguro da obra vencendo", descricao: "Apólice de seguro vence em 18 dias.", prazo: "28/09/2026", criticidade: "media", status: "em-andamento" },
  { id: "pend-marmoraria", obraId: OBRA_DEMO_ID, categoria: "fornecedor", titulo: "Marmoraria sem confirmação", descricao: "Marmoraria Alfa não confirmou a visita de medição.", prazo: "hoje", responsavel: "Marmoraria Alfa", criticidade: "alta", status: "aguardando-terceiro", ambiente: "Cozinha" },
  { id: "pend-nc023", obraId: OBRA_DEMO_ID, categoria: "obra", titulo: "NC-023 vence hoje", descricao: "Não conformidade de instalação elétrica na cozinha vence hoje.", prazo: "hoje", criticidade: "alta", status: "aberto", ambiente: "Cozinha" },
  { id: "pend-revisao-marcenaria", obraId: OBRA_DEMO_ID, categoria: "projeto", titulo: "Nova revisão de projeto disponível", descricao: "Projeto de marcenaria possui revisão nova (REV 04).", criticidade: "baixa", status: "resolvido" },
];

/* Meu Dia — checklist de visita de hoje (perfil Operacional) */
export const visitaChecklistHoje: VisitaChecklist = {
  id: "visita-hoje-marcelo",
  obraId: OBRA_DEMO_ID,
  horario: "16:00",
  ambiente: "Cozinha",
  objetivo: "Conferir instalação de marmoraria",
  fornecedor: "Marmoraria Alfa",
  itens: [
    { id: "chk-bancada", label: "Bancada instalada", estado: null },
    { id: "chk-furacao", label: "Furação conforme projeto", estado: null },
    { id: "chk-acabamento", label: "Acabamento conferido", estado: null },
    { id: "chk-medidas", label: "Medidas conferidas", estado: null },
    { id: "chk-evidencias", label: "Registrar evidências", estado: null },
  ],
};

/* Timeline / histórico */
export const timelineEventos: EventoTimeline[] = [
  { id: "tl-1", obraId: OBRA_DEMO_ID, data: "Hoje", hora: "14:32", usuario: "Marmoraria Alfa", tipo: "Agenda", descricao: "Confirmou visita para amanhã.", origem: "Agenda" },
  { id: "tl-2", obraId: OBRA_DEMO_ID, data: "Hoje", hora: "11:08", usuario: "Marcenaria Fortes", tipo: "Projeto", descricao: "Projeto Executivo atualizado da REV 03 para REV 04.", origem: "Projetos" },
  { id: "tl-3", obraId: OBRA_DEMO_ID, data: "Ontem", hora: "17:45", usuario: "Família Castellani", tipo: "Aprovação", descricao: "Cliente aprovou marcenaria com 3 dias de atraso.", origem: "Compras" },
  { id: "tl-4", obraId: OBRA_DEMO_ID, data: "Ontem", hora: "15:20", usuario: "Fernanda Almeida", tipo: "Não Conformidade", descricao: "NC-023 criada na cozinha.", origem: "Não Conformidades" },
  { id: "tl-5", obraId: OBRA_DEMO_ID, data: "Ontem", hora: "09:12", usuario: "Marmoraria Alfa", tipo: "Agenda", descricao: "Fornecedor não compareceu à medição.", origem: "Agenda" },
  { id: "tl-6", obraId: OBRA_DEMO_ID, data: "2 dias atrás", hora: "10:00", usuario: "Marcelo Duarte", tipo: "Diário", descricao: "RDO registrado com 7 colaboradores em campo.", origem: "Diário de Obra" },
  { id: "tl-7", obraId: OBRA_DEMO_ID, data: "3 dias atrás", hora: "16:40", usuario: "Vidraçaria Cristal", tipo: "Projeto", descricao: "Projeto de vidraçaria enviado para revisão.", origem: "Projetos" },
];

export const resumoDesdeUltimaVisita = {
  novosProjetos: 1,
  atividadesConcluidas: 2,
  fornecedoresAtrasados: 1,
  novasEvidencias: 3,
  aprovacoesRealizadas: 1,
};
