export interface AIMessage {
  id: string;
  autor: "usuario" | "ai";
  texto: string;
  itens?: { titulo: string; descricao: string; href: string }[];
  passos?: string[];
}

interface RespostaAI {
  keywords: string[];
  texto: string;
  itens?: { titulo: string; descricao: string; href: string }[];
  passos?: string[];
}

export const respostasAI: RespostaAI[] = [
  {
    keywords: ["atencao hoje", "resolver hoje", "precisam da minha atencao"],
    texto: "Identifiquei 4 operações que requerem atenção.",
    itens: [
      { titulo: "Residencial Jardins", descricao: "Milestone de marcenaria em risco (+8 dias).", href: "/cronograma?obra=residencial-jardins" },
      { titulo: "Apartamento Moema", descricao: "Cliente sem aprovar vidraçaria há 5 dias.", href: "/obras/apartamento-moema?tab=compras" },
      { titulo: "Casa Alphaville", descricao: "Liberação da obra expira em 12 dias.", href: "/obras/casa-alphaville?tab=documentos" },
      { titulo: "Reforma Corporativa", descricao: "Fornecedor não compareceu à visita de hoje.", href: "/obras/reforma-corporativa?tab=agenda" },
    ],
  },
  {
    keywords: ["falta nesta obra", "o que falta"],
    texto: "Na Residencial Jardins, 2 documentos precisam de atenção.",
    itens: [
      { titulo: "Memorial descritivo", descricao: "Requer revisão — assinatura não encontrada.", href: "/obras/residencial-jardins?tab=documentos" },
      { titulo: "ART — Instalação de vidraçaria", descricao: "Ainda não enviada pela Vidraçaria Cristal.", href: "/obras/residencial-jardins?tab=documentos" },
    ],
  },
  {
    keywords: ["esta pendente", "pendencias", "o que esta pendente"],
    texto: "Existem 4 pendências em aberto na operação.",
    itens: [
      { titulo: "Aprovação da vidraçaria", descricao: "Cliente precisa aprovar até amanhã.", href: "/obras/residencial-jardins?tab=pendencias" },
      { titulo: "Marmoraria sem confirmação", descricao: "Fornecedor não confirmou a visita de hoje.", href: "/obras/residencial-jardins?tab=pendencias" },
      { titulo: "NC-023 vence hoje", descricao: "Instalação elétrica divergente na cozinha.", href: "/obras/residencial-jardins?tab=nao-conformidades" },
    ],
  },
  {
    keywords: ["fornecedores estao atrasados", "fornecedores atrasados", "mais nao conformidades"],
    texto: "A Marmoraria Alfa é o fornecedor com maior atenção necessária no momento.",
    itens: [{ titulo: "Marmoraria Alfa", descricao: "74% de performance · 1 ocorrência recente.", href: "/compras" }],
  },
  {
    keywords: ["mudou desde", "ultima consulta", "aconteceu esta semana", "ultima visita"],
    texto: "Desde sua última consulta: 1 novo projeto, 2 atividades concluídas, 1 fornecedor atrasado, 3 novas evidências e 1 aprovação realizada.",
    itens: [{ titulo: "Ver linha do tempo completa", descricao: "Histórico consolidado da Residencial Jardins.", href: "/obras/residencial-jardins?tab=historico" }],
  },
  {
    keywords: ["documentos vencendo", "vencendo nos proximos 30"],
    texto: "1 documento vence nos próximos 30 dias.",
    itens: [{ titulo: "Apólice de seguro da obra", descricao: "Vence em 18 dias.", href: "/obras/residencial-jardins?tab=documentos" }],
  },
  {
    keywords: ["aprovacao da marcenaria atrasou", "como manter a entrega", "impacto"],
    texto: "Identifiquei impacto em 3 frentes por conta do atraso na aprovação da marcenaria.",
    passos: [
      "1. Produção",
      "2. Pintura final",
      "3. Instalação de mobiliário",
      "Plano sugerido: reduzir produção em 4 dias, antecipar preparação do ambiente e executar atividades independentes em paralelo.",
      "Resultado: o milestone final permanece com risco de 2 dias.",
    ],
    itens: [{ titulo: "Ver no cronograma", descricao: "Simulação de impacto na Residencial Jardins.", href: "/cronograma?obra=residencial-jardins" }],
  },
  {
    keywords: ["ultima atualizacao da cozinha", "cozinha"],
    texto: "A cozinha teve 4 novas evidências e 1 não conformidade nos últimos 2 dias.",
    itens: [{ titulo: "Ver evidências da Cozinha", descricao: "Marcenaria, elétrica e vidraçaria.", href: "/obras/residencial-jardins?tab=evidencias" }],
  },
  {
    keywords: ["milestones estao em risco", "marcos em risco"],
    texto: "1 marco crítico está em risco no portfólio.",
    itens: [{ titulo: "Liberação de marcenaria", descricao: "Dependências ultrapassam o marco em 6 dias.", href: "/cronograma?obra=residencial-jardins" }],
  },
];

export const respostaPadrao: RespostaAI = respostasAI[0];

export function encontrarResposta(pergunta: string): RespostaAI {
  const normalizada = pergunta
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  const encontrada = respostasAI.find((r) => r.keywords.some((k) => normalizada.includes(k)));
  return encontrada ?? respostaPadrao;
}

export const sugestoesAI = [
  "Quais obras apresentam risco de atraso?",
  "O que falta nesta obra?",
  "Quais fornecedores estão atrasados?",
  "O que mudou desde minha última consulta?",
];

export const sugestoesPorContexto: Record<string, string[]> = {
  cronograma: ["Analise os riscos deste cronograma.", "O que pode comprometer a entrega?", "A aprovação da marcenaria atrasou 7 dias. Como manter a entrega?"],
  documentos: ["O que falta nesta obra?", "Este documento está válido?", "Existem documentos vencendo nos próximos 30 dias?"],
  compras: ["Compare essas propostas.", "Quais fornecedores estão atrasados?"],
  evidencias: ["Gere o relatório desta visita.", "Qual foi a última atualização da cozinha?"],
  "nao-conformidades": ["Qual é o impacto desta ocorrência?", "Quais fornecedores possuem mais não conformidades?"],
  agenda: ["O que mudou desde minha última consulta?"],
  pendencias: ["O que está pendente?", "O que preciso resolver hoje?"],
  historico: ["O que mudou desde minha última consulta?", "O que aconteceu esta semana?"],
};
