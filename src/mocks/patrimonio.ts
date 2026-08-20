import type { UnidadePatrimonio } from "@/types";

export const unidadesPatrimonio: UnidadePatrimonio[] = [
  { id: "u1", nome: "Sede RJ", tipo: "Sede Administrativa", area: 8200, valor: 142000000, ativos: 5210, condicao: 91, cidade: "Rio de Janeiro", estado: "RJ" },
  { id: "u2", nome: "Unidade São Paulo", tipo: "Escritório Corporativo", area: 5400, valor: 98000000, ativos: 3890, condicao: 88, cidade: "São Paulo", estado: "SP" },
  { id: "u3", nome: "Unidade Brasília", tipo: "Centro Administrativo", area: 12100, valor: 156000000, ativos: 4720, condicao: 76, cidade: "Brasília", estado: "DF" },
  { id: "u4", nome: "Unidade Ribeirão Preto", tipo: "Hospitalar", area: 9800, valor: 64000000, ativos: 3105, condicao: 94, cidade: "Ribeirão Preto", estado: "SP" },
  { id: "u5", nome: "Unidade Campinas", tipo: "Educacional", area: 3200, valor: 27200000, ativos: 1504, condicao: 82, cidade: "Campinas", estado: "SP" },
];

export const ativosPorCategoria = [
  { categoria: "Climatização", quantidade: 4820, valor: 178000000 },
  { categoria: "Energia", quantidade: 3210, valor: 145000000 },
  { categoria: "Hidráulica", quantidade: 2890, valor: 52000000 },
  { categoria: "Segurança", quantidade: 3105, valor: 68000000 },
  { categoria: "Transporte Vertical", quantidade: 412, valor: 31000000 },
  { categoria: "Acesso", quantidade: 3992, valor: 13200000 },
];

export const movimentacoesRecentes = [
  { id: "m1", ativo: "Chiller Carrier 30XW", tipo: "Manutenção Preventiva", unidade: "Sede RJ", data: "12/03/2026", responsavel: "Facilities RJ" },
  { id: "m2", ativo: "Elevador Otis Gen2", tipo: "Manutenção Corretiva", unidade: "Unidade São Paulo", data: "28/02/2026", responsavel: "Otis Manutenção" },
  { id: "m3", ativo: "Gerador Diesel Stemac 250kVA", tipo: "Inspeção Técnica", unidade: "Sede RJ", data: "02/03/2026", responsavel: "Facilities RJ" },
  { id: "m4", ativo: "Torre de Resfriamento", tipo: "Manutenção Preventiva", unidade: "Unidade Campinas", data: "22/02/2026", responsavel: "Climatiza Sul" },
  { id: "m5", ativo: "Sistema de Combate a Incêndio", tipo: "Não Conformidade", unidade: "Sede RJ", data: "20/12/2025", responsavel: "Facilities RJ" },
];
