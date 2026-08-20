export const saudeObras = [
  { name: "No prazo", value: 6, color: "var(--color-status-ok)" },
  { name: "Atenção", value: 4, color: "var(--color-status-warn)" },
  { name: "Crítico", value: 2, color: "var(--color-status-critical)" },
];

export const evolucaoObras = [
  { mes: "Out", planejado: 32, realizado: 30 },
  { mes: "Nov", planejado: 39, realizado: 35 },
  { mes: "Dez", planejado: 46, realizado: 40 },
  { mes: "Jan", planejado: 54, realizado: 47 },
  { mes: "Fev", planejado: 61, realizado: 55 },
  { mes: "Mar", planejado: 69, realizado: 61 },
];

export const pendenciasPorCategoria = [
  { categoria: "Elétrica", quantidade: 14 },
  { categoria: "Civil", quantidade: 11 },
  { categoria: "Segurança", quantidade: 8 },
  { categoria: "Estrutural", quantidade: 6 },
  { categoria: "Projeto", quantidade: 4 },
  { categoria: "Climatização", quantidade: 3 },
];

export const patrimonioPorUnidade = [
  { unidade: "Sede RJ", valor: 142 },
  { unidade: "São Paulo", valor: 98 },
  { unidade: "Brasília", valor: 156 },
  { unidade: "Ribeirão Preto", valor: 64 },
  { unidade: "Campinas", valor: 27.2 },
];

export const custosMensais = [
  { mes: "Out", previsto: 4.2, realizado: 4.4 },
  { mes: "Nov", previsto: 4.6, realizado: 4.5 },
  { mes: "Dez", previsto: 5.1, realizado: 5.4 },
  { mes: "Jan", previsto: 5.4, realizado: 5.2 },
  { mes: "Fev", previsto: 5.8, realizado: 6.1 },
  { mes: "Mar", previsto: 6.2, realizado: 6.0 },
];

export const performanceFornecedores = [
  { nome: "Marcenaria Fortes", performance: 95 },
  { nome: "Climatiza Sul", performance: 91 },
  { nome: "Restaura Patrimônio", performance: 89 },
  { nome: "ENGIX Engenharia", performance: 87 },
  { nome: "Verde Paisagismo", performance: 82 },
  { nome: "Estrutural Prime", performance: 68 },
];

export const riscosOperacionais = [
  { risco: "Atraso de cronograma", probabilidade: 78, impacto: 82 },
  { risco: "Estouro de orçamento", probabilidade: 54, impacto: 70 },
  { risco: "Não conformidade recorrente", probabilidade: 61, impacto: 55 },
  { risco: "Rotatividade de mão de obra", probabilidade: 40, impacto: 48 },
  { risco: "Falha de fornecedor crítico", probabilidade: 35, impacto: 75 },
];

export const tendenciaSla = [
  { mes: "Out", sla: 91.2 },
  { mes: "Nov", sla: 92.0 },
  { mes: "Dez", sla: 90.5 },
  { mes: "Jan", sla: 93.1 },
  { mes: "Fev", sla: 94.0 },
  { mes: "Mar", sla: 94.8 },
];
