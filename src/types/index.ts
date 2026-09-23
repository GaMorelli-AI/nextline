export type StatusObra = "no-prazo" | "atencao" | "critico" | "concluido";

export type Severidade = "baixa" | "media" | "alta";
export type StatusNC = "aberta" | "em-tratamento" | "resolvida";

export interface Obra {
  id: string;
  nome: string;
  cliente: string;
  contrato: string;
  progresso: number;
  progressoFinanceiro: number;
  status: StatusObra;
  prazo: string;
  inicio: string;
  responsavel: string;
  responsavelAvatar: string;
  ncsAbertas: number;
  ultimoRdo: string;
  endereco: string;
  unidade: string;
  equipeHoje: number;
  pendencias: number;
  diasRestantes: number;
  descricao: string;
  valorContrato: number;
  bufferDiasCliente?: number;
}

export interface AtividadeCronograma {
  id: string;
  atividade: string;
  responsavel: string;
  inicio: string;
  fim: string;
  progresso: number;
  status: "no-prazo" | "atencao" | "atrasado" | "concluido";
  disciplina: string;
}

export interface RDO {
  id: string;
  numero: string;
  obraId: string;
  data: string;
  autor: string;
  clima: string;
  colaboradores: number;
  horasTrabalhadas: number;
  status: "concluido" | "rascunho";
  servicosExecutados: string;
  ocorrencias: string;
}

export interface NaoConformidade {
  id: string;
  obraId: string;
  descricao: string;
  categoria: string;
  responsavel: string;
  prazo: string;
  severidade: Severidade;
  status: StatusNC;
  dataAbertura: string;
  fotos: number;
  comentarios: { autor: string; data: string; texto: string }[];
  timeline: { data: string; evento: string }[];
}

export interface Evidencia {
  id: string;
  obraId: string;
  data: string;
  hora: string;
  ambiente: string;
  disciplina: string;
  tipo: string;
  responsavel: string;
  rdo: string;
  thumb: string;
  fornecedor?: string;
  item?: string;
  atividade?: string;
  status?: string;
  formato?: "foto" | "360";
  link360?: string;
  incluirRelatorio?: boolean;
}

export interface Fornecedor {
  id: string;
  nome: string;
  especialidade: string;
  obrasVinculadas: string[];
  performance: number;
  ocorrencias: number;
  avaliacao: number;
  contato: string;
  cnpj: string;
}

export interface Documento {
  id: string;
  nome: string;
  categoria: string;
  versao: string;
  responsavel: string;
  atualizacao: string;
  status: "aprovado" | "em-revisao" | "pendente" | "vencido";
  obraId?: string;
  tamanho: string;
}

export interface Ativo {
  codigo: string;
  nome: string;
  categoria: string;
  unidade: string;
  estado: "operacional" | "manutencao" | "inativo" | "critico";
  ultimaInspecao: string;
  fabricante: string;
  modelo: string;
  instalacao: string;
  proximaManutencao: string;
  valor: number;
}

export interface UnidadePatrimonio {
  id: string;
  nome: string;
  tipo: string;
  area: number;
  valor: number;
  ativos: number;
  condicao: number;
  cidade: string;
  estado: string;
}

export interface PinMapa {
  id: string;
  nome: string;
  status: "ok" | "atencao" | "critico";
  progresso: number;
  responsavel: string;
  ultimaAtualizacao: string;
  x: number;
  y: number;
  tipo: "obra" | "unidade";
}

export interface Notificacao {
  id: string;
  tipo: "atraso" | "aprovacao" | "nc" | "documento" | "rdo" | "sistema";
  titulo: string;
  descricao: string;
  data: string;
  periodo: "hoje" | "ontem" | "semana";
  lida: boolean;
}

export interface Contrato {
  id: string;
  numero: string;
  cliente: string;
  objeto: string;
  valor: number;
  vigenciaInicio: string;
  vigenciaFim: string;
  status: "ativo" | "encerrado" | "suspenso";
  obraId?: string;
}

export interface Medicao {
  id: string;
  numero: string;
  obraId: string;
  valor: number;
  status: "aguardando" | "aprovada" | "rejeitada";
  etapaAtual: number;
  data: string;
}

/* ---------- Perfis de acesso (demonstração, sem autenticação real) ---------- */

export type Perfil = "gestor" | "operacional" | "cliente" | "fornecedor";

/* ---------- Ambientes ---------- */

export interface Ambiente {
  id: string;
  obraId: string;
  nome: string;
}

/* ---------- Cronograma enriquecido (predecessoras, subtarefas, marcos) ---------- */

export type StatusTarefa = "no-prazo" | "atencao" | "atrasado" | "concluido";

export interface TarefaCronograma {
  id: string;
  obraId: string;
  parentId?: string;
  nome: string;
  disciplina: string;
  responsavel: string;
  fornecedor?: string;
  inicio: string;
  fim: string;
  progresso: number;
  status: StatusTarefa;
  predecessoras?: string[];
  isMilestone?: boolean;
  ambiente?: string;
  visivelCliente?: boolean;
  visivelFornecedorId?: string;
}

export interface Milestone {
  id: string;
  obraId: string;
  nome: string;
  dataPrevista: string;
  status: "no-prazo" | "risco" | "atrasado" | "concluido";
  descricaoRisco?: string;
  diasRisco?: number;
}

/* ---------- Agenda ---------- */

export type StatusAgenda = "aguardando-confirmacao" | "confirmado" | "realizado" | "cancelado" | "nao-compareceu";

export interface EventoAgenda {
  id: string;
  obraId: string;
  titulo: string;
  data: string;
  horario: string;
  ambiente: string;
  objetivo: string;
  responsavel: string;
  fornecedorId?: string;
  status: StatusAgenda;
  observacoes?: string;
  fotos?: number;
}

/* ---------- Projetos e revisões ---------- */

export interface ProjetoRevisao {
  id: string;
  obraId: string;
  categoria: string;
  nome: string;
  revisao: string;
  versaoVigente: boolean;
  data: string;
  responsavel: string;
  aprovadoPor?: string;
  status: "aprovado" | "em-revisao" | "substituido";
  observacoes?: string;
  resumoAlteracoes?: string;
  origem: "nextline" | "integracao-externa";
}

/* ---------- Documentos / checklist da obra ---------- */

export type StatusDocumentoObra =
  | "nao-enviado"
  | "aguardando-validacao"
  | "validado"
  | "requer-revisao"
  | "expirado"
  | "nao-aplicavel";

export interface DocumentoObra {
  id: string;
  obraId: string;
  nome: string;
  categoria: string;
  grupo: "imprescindivel" | "comum" | "condicional";
  status: StatusDocumentoObra;
  validadeAte?: string;
  responsavel?: string;
  iaResultado?: { validado: boolean; checks: string[]; alerta?: string };
}

/* ---------- Compras: cotações e pedidos ---------- */

export interface Cotacao {
  fornecedor: string;
  valor: number;
  prazoDiasUteis: number;
}

export interface GrupoCotacao {
  id: string;
  obraId: string;
  itemNome: string;
  ambiente: string;
  cotacoes: Cotacao[];
  escolhida?: string;
  dataInstalacaoNecessaria: string;
  prazoMedicaoDias: number;
  status: "cotando" | "aprovacao-cliente" | "fechado";
}

export interface AprovacaoCliente {
  id: string;
  obraId: string;
  titulo: string;
  ambiente: string;
  propostas: number;
  prazo: string;
  solicitadoEm: string;
  visualizadoEm?: string;
  aprovadoEm?: string;
  atrasoDias?: number;
  status: "aguardando" | "aprovado";
}

export interface PedidoFechado {
  id: string;
  obraId: string;
  itemNome: string;
  fornecedor: string;
  valor: number;
  dataFechamento: string;
  prazoProducaoDias: number;
  dataInstalacaoPrevista: string;
  projetoRelacionado: string;
  status: "producao" | "entregue" | "instalado" | "conferido";
}

/* ---------- Pendências ---------- */

export type CategoriaPendencia = "aprovacao" | "documento" | "fornecedor" | "obra" | "projeto";
export type StatusPendencia = "aberto" | "em-andamento" | "aguardando-terceiro" | "resolvido" | "vencido";

export interface ResolucaoPendencia {
  observacao: string;
  fotos: number;
  resolvidoPor: string;
  resolvidoEm: string;
}

export interface Pendencia {
  id: string;
  obraId: string;
  categoria: CategoriaPendencia;
  titulo: string;
  descricao: string;
  prazo?: string;
  responsavel?: string;
  criticidade: Severidade;
  status: StatusPendencia;
  ambiente?: string;
  resolucao?: ResolucaoPendencia;
}

/* ---------- Checklist de visita (Meu Dia) ---------- */

export type EstadoChecklistItem = "executado" | "parcial" | "nao-executado" | "nao-se-aplica" | null;

export interface ItemChecklist {
  id: string;
  label: string;
  estado: EstadoChecklistItem;
}

export interface VisitaChecklist {
  id: string;
  obraId: string;
  horario: string;
  ambiente: string;
  objetivo: string;
  fornecedor?: string;
  itens: ItemChecklist[];
}

/* ---------- Timeline / histórico ---------- */

export interface EventoTimeline {
  id: string;
  obraId: string;
  data: string;
  hora: string;
  usuario: string;
  tipo: string;
  descricao: string;
  origem: string;
}
