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

const ambientesJardins = ["Cozinha", "Suíte Master", "Sala", "Suíte 02", "Varanda"];
const disciplinasJardins = ["Marcenaria", "Vidraçaria", "Elétrica", "Pintura"];
const responsaveisJardins = ["Fernanda Almeida", "Marcelo Duarte", "Marcenaria Fortes", "ENGIX Engenharia"];

export const evidenciasJardins: Evidencia[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `ev-jardins-${i + 1}`,
  obraId: "residencial-jardins",
  data: `${String(10 - (i % 9)).padStart(2, "0")}/09/2026`,
  hora: `${String(8 + (i % 9)).padStart(2, "0")}:${String((i * 11) % 60).padStart(2, "0")}`,
  ambiente: ambientesJardins[i % ambientesJardins.length],
  disciplina: disciplinasJardins[i % disciplinasJardins.length],
  tipo: i % 5 === 0 ? "Não Conformidade" : "Progresso",
  responsavel: responsaveisJardins[i % responsaveisJardins.length],
  rdo: `#RDO-JD-${300 + i}`,
  thumb: `${(i % 6) + 1}`,
}));

evidencias.push(...evidenciasJardins);

export const getEvidenciasByObra = (obraId: string) => evidencias.filter((e) => e.obraId === obraId);
