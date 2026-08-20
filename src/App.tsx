import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/layouts/AppShell";
import { NextAIProvider } from "@/context/NextAIContext";
import { ThemeProvider } from "@/context/ThemeContext";

import { HomePage } from "@/features/home/HomePage";
import { ObrasListPage } from "@/features/obras/ObrasListPage";
import { ObraDetailPage } from "@/features/obras/ObraDetailPage";
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
        <NextAIProvider>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/obras" element={<ObrasListPage />} />
              <Route path="/obras/:obraId" element={<ObraDetailPage />} />
              <Route path="/patrimonio" element={<PatrimonioPage />} />
              <Route path="/ativos" element={<AtivosPage />} />
              <Route path="/ativos/:codigo" element={<AtivoDetailPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/documentos" element={<DocumentosPage />} />
              <Route path="/contratos" element={<ContratosPage />} />
              <Route path="/fornecedores" element={<FornecedoresPage />} />
              <Route path="/bim" element={<BimPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/administracao" element={<AdministracaoPage />} />
              <Route path="/configuracoes" element={<ConfiguracoesPage />} />
              <Route path="/notificacoes" element={<NotificacoesPage />} />
            </Route>
          </Routes>
        </NextAIProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
