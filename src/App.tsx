import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/layouts/AppShell";
import { NextAIProvider } from "@/context/NextAIContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProfileProvider } from "@/context/ProfileContext";

import { HomePage } from "@/features/home/HomePage";
import { MeuDiaPage } from "@/features/meudia/MeuDiaPage";
import { PendenciasPage } from "@/features/pendencias/PendenciasPage";
import { AgendaPage } from "@/features/agenda/AgendaPage";
import { ComprasPage } from "@/features/compras/ComprasPage";
import { RelatoriosPage } from "@/features/relatorios/RelatoriosPage";
import { ObrasListPage } from "@/features/obras/ObrasListPage";
import { ObraDetailPage } from "@/features/obras/ObraDetailPage";
import { CronogramaPage } from "@/features/cronograma/CronogramaPage";
import { PatrimonioPage } from "@/features/patrimonio/PatrimonioPage";
import { AtivosPage } from "@/features/ativos/AtivosPage";
import { AtivoDetailPage } from "@/features/ativos/AtivoDetailPage";
import { FacilitiesPage } from "@/features/facilities/FacilitiesPage";
import { DocumentosPage } from "@/features/documentos/DocumentosPage";
import { ContratosPage } from "@/features/contratos/ContratosPage";
import { FornecedoresPage } from "@/features/fornecedores/FornecedoresPage";
import { BimPage } from "@/features/bim/BimPage";
import { AnalyticsPage } from "@/features/analytics/AnalyticsPage";
import { AdministracaoPage } from "@/features/admin/AdministracaoPage";
import { ConfiguracoesPage } from "@/features/admin/ConfiguracoesPage";
import { NotificacoesPage } from "@/features/notificacoes/NotificacoesPage";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ProfileProvider>
          <NextAIProvider>
            <Routes>
              <Route element={<AppShell />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/meu-dia" element={<MeuDiaPage />} />
                <Route path="/obras" element={<ObrasListPage />} />
                <Route path="/obras/:obraId" element={<ObraDetailPage />} />
                <Route path="/cronograma" element={<CronogramaPage />} />
                <Route path="/pendencias" element={<PendenciasPage />} />
                <Route path="/agenda" element={<AgendaPage />} />
                <Route path="/documentos" element={<DocumentosPage />} />
                <Route path="/compras" element={<ComprasPage />} />
                <Route path="/relatorios" element={<RelatoriosPage />} />
                <Route path="/fornecedores" element={<FornecedoresPage />} />
                <Route path="/contratos" element={<ContratosPage />} />
                <Route path="/patrimonio" element={<PatrimonioPage />} />
                <Route path="/ativos" element={<AtivosPage />} />
                <Route path="/ativos/:codigo" element={<AtivoDetailPage />} />
                <Route path="/facilities" element={<FacilitiesPage />} />
                <Route path="/bim" element={<BimPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/administracao" element={<AdministracaoPage />} />
                <Route path="/configuracoes" element={<ConfiguracoesPage />} />
                <Route path="/notificacoes" element={<NotificacoesPage />} />
              </Route>
            </Routes>
          </NextAIProvider>
        </ProfileProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
