export interface ElementoBIM {
  id: string;
  nome: string;
  tipo: string;
  status: "operacional" | "manutencao" | "critico";
  ultimaManutencao: string;
  proximaManutencao: string;
  documentos: number;
  ordens: number;
  x: number;
  y: number;
}

export const elementosBIM: ElementoBIM[] = [
  { id: "AHU-004", nome: "AHU-004", tipo: "Climatização", status: "operacional", ultimaManutencao: "12/03/2026", proximaManutencao: "12/09/2026", documentos: 8, ordens: 3, x: 62, y: 34 },
  { id: "QDE-012", nome: "QDE-012", tipo: "Elétrica", status: "operacional", ultimaManutencao: "02/02/2026", proximaManutencao: "02/08/2026", documentos: 5, ordens: 1, x: 30, y: 48 },
  { id: "BOMB-003", nome: "BOMB-003", tipo: "Hidráulica", status: "manutencao", ultimaManutencao: "18/01/2026", proximaManutencao: "18/04/2026", documentos: 4, ordens: 2, x: 45, y: 66 },
  { id: "ELEV-001", nome: "ELEV-001", tipo: "Transporte Vertical", status: "critico", ultimaManutencao: "28/02/2026", proximaManutencao: "05/04/2026", documentos: 6, ordens: 3, x: 74, y: 58 },
];
