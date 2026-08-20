import type { Ativo } from "@/types";

export const ativos: Ativo[] = [
  { codigo: "PAT-0001842", nome: "Chiller Carrier 30XW", categoria: "Climatização", unidade: "Sede RJ", estado: "operacional", ultimaInspecao: "12/03/2026", fabricante: "Carrier", modelo: "30XW-502", instalacao: "14/05/2019", proximaManutencao: "12/09/2026", valor: 480000 },
  { codigo: "PAT-0001843", nome: "Gerador Diesel Stemac 250kVA", categoria: "Energia", unidade: "Sede RJ", estado: "operacional", ultimaInspecao: "02/03/2026", fabricante: "Stemac", modelo: "GS250", instalacao: "20/08/2018", proximaManutencao: "02/06/2026", valor: 210000 },
  { codigo: "PAT-0002011", nome: "Elevador Otis Gen2", categoria: "Transporte Vertical", unidade: "Unidade São Paulo", estado: "manutencao", ultimaInspecao: "28/02/2026", fabricante: "Otis", modelo: "Gen2-Premier", instalacao: "10/11/2020", proximaManutencao: "10/04/2026", valor: 650000 },
  { codigo: "PAT-0002145", nome: "Subestação Transformadora 500kVA", categoria: "Energia", unidade: "Unidade Brasília", estado: "operacional", ultimaInspecao: "15/01/2026", fabricante: "WEG", modelo: "SE-500", instalacao: "05/03/2017", proximaManutencao: "15/07/2026", valor: 890000 },
  { codigo: "PAT-0002298", nome: "Sistema de Combate a Incêndio", categoria: "Segurança", unidade: "Sede RJ", estado: "critico", ultimaInspecao: "20/12/2025", fabricante: "Kidde", modelo: "FM-200", instalacao: "01/06/2019", proximaManutencao: "20/03/2026", valor: 340000 },
  { codigo: "PAT-0002355", nome: "Bomba de Recalque Centrífuga", categoria: "Hidráulica", unidade: "Unidade Ribeirão Preto", estado: "operacional", ultimaInspecao: "05/03/2026", fabricante: "KSB", modelo: "Meganorm 80", instalacao: "22/09/2021", proximaManutencao: "05/09/2026", valor: 95000 },
  { codigo: "PAT-0002410", nome: "AHU-004 Unidade de Tratamento de Ar", categoria: "Climatização", unidade: "Unidade São Paulo", estado: "operacional", ultimaInspecao: "12/03/2026", fabricante: "Trane", modelo: "AHU-C500", instalacao: "18/04/2020", proximaManutencao: "12/09/2026", valor: 175000 },
  { codigo: "PAT-0002501", nome: "Nobreak Central 80kVA", categoria: "Energia", unidade: "Unidade Brasília", estado: "operacional", ultimaInspecao: "10/02/2026", fabricante: "APC", modelo: "Symmetra PX", instalacao: "14/12/2019", proximaManutencao: "10/08/2026", valor: 230000 },
  { codigo: "PAT-0002612", nome: "Portão Automatizado Estacionamento", categoria: "Acesso", unidade: "Sede RJ", estado: "inativo", ultimaInspecao: "30/11/2025", fabricante: "PPA", modelo: "Rio 1/3 CS", instalacao: "08/07/2017", proximaManutencao: "—", valor: 18000 },
  { codigo: "PAT-0002734", nome: "Torre de Resfriamento", categoria: "Climatização", unidade: "Unidade Campinas", estado: "manutencao", ultimaInspecao: "22/02/2026", fabricante: "Alpina", modelo: "TR-350", instalacao: "11/05/2018", proximaManutencao: "22/05/2026", valor: 260000 },
];

export const getAtivoByCodigo = (codigo: string) => ativos.find((a) => a.codigo === codigo);
