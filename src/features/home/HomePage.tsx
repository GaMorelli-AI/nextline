import { useProfile } from "@/context/ProfileContext";
import { GestorHome } from "@/features/home/GestorHome";
import { ClienteHome } from "@/features/home/ClienteHome";
import { FornecedorHome } from "@/features/home/FornecedorHome";
import { MeuDiaPage } from "@/features/meudia/MeuDiaPage";

export function HomePage() {
  const { perfil } = useProfile();

  if (perfil === "operacional") return <MeuDiaPage />;
  if (perfil === "cliente") return <ClienteHome />;
  if (perfil === "fornecedor") return <FornecedorHome />;
  return <GestorHome />;
}
