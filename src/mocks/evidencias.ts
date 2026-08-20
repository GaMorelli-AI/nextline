import type { Evidencia } from "@/types";

const disciplinas = ["Elétrica", "Civil", "Climatização", "Marcenaria", "Estrutural", "Hidráulica"];
const ambientes = ["Pavimento 2", "Ala Leste", "Térreo", "Sala de Servidores", "Fachada", "Subsolo"];
const tipos = ["Progresso", "Não Conformidade", "Segurança", "Entrega"];
const responsaveis = ["Geovanna Sena", "Rafael Tosta", "ENGIX Engenharia", "Equipe Civil B"];

export const evidencias: Evidencia[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `ev-${i + 1}`,
  obraId: "sala-sp",
  data: `${String(26 - (i % 20)).padStart(2, "0")}/03/2026`,
  hora: `${String(8 + (i % 10)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  ambiente: ambientes[i % ambientes.length],
  disciplina: disciplinas[i % disciplinas.length],
  tipo: tipos[i % tipos.length],
  responsavel: responsaveis[i % responsaveis.length],
  rdo: `#13771${1500 + i * 12}`,
  thumb: `${(i % 6) + 1}`,
}));

export const getEvidenciasByObra = (obraId: string) => evidencias.filter((e) => e.obraId === obraId);
