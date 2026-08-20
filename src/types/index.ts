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
