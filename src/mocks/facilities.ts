export interface OrdemServico {
  id: string;
  ativo: string;
  tipo: "Preventiva" | "Corretiva";
  unidade: string;
  status: "aberta" | "em-tratamento" | "resolvida";
  prioridade: "baixa" | "media" | "alta";
  responsavel: string;
  abertura: string;
  prazo: string;
}

export const ordensServico: OrdemServico[] = [
  { id: "OS-4821", ativo: "Chiller Carrier 30XW", tipo: "Preventiva", unidade: "Sede RJ", status: "resolvida", prioridade: "media", responsavel: "Facilities RJ", abertura: "10/03/2026", prazo: "15/03/2026" },
  { id: "OS-4822", ativo: "Elevador Otis Gen2", tipo: "Corretiva", unidade: "Unidade São Paulo", status: "em-tratamento", prioridade: "alta", responsavel: "Otis Manutenção", abertura: "28/02/2026", prazo: "05/04/2026" },
  { id: "OS-4823", ativo: "Sistema de Combate a Incêndio", tipo: "Corretiva", unidade: "Sede RJ", status: "aberta", prioridade: "alta", responsavel: "Facilities RJ", abertura: "20/12/2025", prazo: "20/03/2026" },
  { id: "OS-4824", ativo: "Torre de Resfriamento", tipo: "Preventiva", unidade: "Unidade Campinas", status: "em-tratamento", prioridade: "media", responsavel: "Climatiza Sul", abertura: "22/02/2026", prazo: "22/05/2026" },
  { id: "OS-4825", ativo: "Gerador Diesel Stemac 250kVA", tipo: "Preventiva", unidade: "Sede RJ", status: "resolvida", prioridade: "baixa", responsavel: "Facilities RJ", abertura: "02/03/2026", prazo: "02/06/2026" },
  { id: "OS-4826", ativo: "Subestação Transformadora 500kVA", tipo: "Preventiva", unidade: "Unidade Brasília", status: "aberta", prioridade: "media", responsavel: "Facilities DF", abertura: "15/01/2026", prazo: "15/07/2026" },
];

export const custosFacilities = [
  { mes: "Out", preventiva: 82, corretiva: 34 },
  { mes: "Nov", preventiva: 78, corretiva: 41 },
  { mes: "Dez", preventiva: 90, corretiva: 28 },
  { mes: "Jan", preventiva: 95, corretiva: 22 },
  { mes: "Fev", preventiva: 88, corretiva: 36 },
  { mes: "Mar", preventiva: 101, corretiva: 19 },
];
