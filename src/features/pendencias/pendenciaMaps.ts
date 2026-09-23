import { CheckSquare, FileWarning, Truck, HardHat, FolderKanban } from "lucide-react";
import type { CategoriaPendencia, StatusPendencia } from "@/types";

export const categoriaIcon: Record<CategoriaPendencia, typeof CheckSquare> = {
  aprovacao: CheckSquare,
  documento: FileWarning,
  fornecedor: Truck,
  obra: HardHat,
  projeto: FolderKanban,
};

export const categoriaLabel: Record<CategoriaPendencia, string> = {
  aprovacao: "Aprovação",
  documento: "Documento",
  fornecedor: "Fornecedor",
  obra: "Obra",
  projeto: "Projeto",
};

export const statusTone: Record<StatusPendencia, "ok" | "warn" | "critical" | "info" | "neutral"> = {
  aberto: "critical",
  "em-andamento": "info",
  "aguardando-terceiro": "warn",
  resolvido: "ok",
  vencido: "critical",
};

export const statusLabel: Record<StatusPendencia, string> = {
  aberto: "Aberto",
  "em-andamento": "Em andamento",
  "aguardando-terceiro": "Aguardando terceiro",
  resolvido: "Resolvido",
  vencido: "Vencido",
};

export function agora(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}
