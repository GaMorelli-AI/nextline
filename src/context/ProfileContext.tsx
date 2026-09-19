import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Perfil } from "@/types";

const STORAGE_KEY = "nextline-perfil";

interface ProfileContextValue {
  perfil: Perfil;
  setPerfil: (perfil: Perfil) => void;
  nome: string;
}

const nomesPorPerfil: Record<Perfil, string> = {
  gestor: "Fernanda Almeida",
  operacional: "Marcelo Duarte",
  cliente: "Família Castellani",
  fornecedor: "Marcenaria Fortes",
};

export const labelPerfil: Record<Perfil, string> = {
  gestor: "Administrador / Gestor",
  operacional: "Operacional / Campo",
  cliente: "Cliente",
  fornecedor: "Fornecedor",
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

function getInitialProfile(): Perfil {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "gestor" || stored === "operacional" || stored === "cliente" || stored === "fornecedor") return stored;
  return "gestor";
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfilState] = useState<Perfil>(getInitialProfile);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, perfil);
  }, [perfil]);

  function setPerfil(next: Perfil) {
    setPerfilState(next);
  }

  return (
    <ProfileContext.Provider value={{ perfil, setPerfil, nome: nomesPorPerfil[perfil] }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
