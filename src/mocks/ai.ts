export interface AIMessage {
  id: string;
  autor: "usuario" | "ai";
  texto: string;
  itens?: { titulo: string; descricao: string; href: string }[];
}

export const conversaInicial: AIMessage[] = [
  {
    id: "m1",
    autor: "usuario",
    texto: "Quais obras precisam da minha atenção hoje?",
  },
  {
    id: "m2",
    autor: "ai",
    texto: "Identifiquei 3 operações que requerem atenção.",
    itens: [
      { titulo: "Sala São Paulo", descricao: "Risco de atraso de 6 dias.", href: "/obras/sala-sp" },
      { titulo: "Centro Administrativo", descricao: "3 NCs vencidas.", href: "/obras/centro-administrativo?tab=nao-conformidades" },
      { titulo: "Reforma Sede CREA-RJ", descricao: "Medição #04 aguardando aprovação há 4 dias.", href: "/obras/reforma-crea-rj?tab=medicoes" },
    ],
  },
];

export const sugestoesAI = [
  "Quais obras apresentam risco de atraso?",
  "Resuma as ocorrências da Sala São Paulo nesta semana.",
  "Quais fornecedores possuem mais não conformidades?",
  "Existem documentos vencendo nos próximos 30 dias?",
];
