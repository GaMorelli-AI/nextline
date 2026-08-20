import type { Notificacao } from "@/types";

export const notificacoes: Notificacao[] = [
  { id: "n1", tipo: "atraso", titulo: "Cronograma com atraso — Sala São Paulo", descricao: "Atraso estimado de 6 dias na entrega final devido à instalação de eletrodutos rígidos.", data: "Hoje, 17:42", periodo: "hoje", lida: false },
  { id: "n2", tipo: "nc", titulo: "Nova não conformidade — NC-018", descricao: "Instalação elétrica divergente do projeto identificada na Sala São Paulo.", data: "Hoje, 14:10", periodo: "hoje", lida: false },
  { id: "n3", tipo: "aprovacao", titulo: "Medição aguardando aprovação", descricao: "Medição Nº 04 do Contrato 171/2024 aguarda validação do gestor.", data: "Hoje, 11:05", periodo: "hoje", lida: true },
  { id: "n4", tipo: "rdo", titulo: "RDO enviado — Sala São Paulo", descricao: "RDO #137712126 enviado por Geovanna de Sena.", data: "Hoje, 17:42", periodo: "hoje", lida: false },
  { id: "n5", tipo: "nc", titulo: "3 NCs vencidas — Centro Administrativo", descricao: "Não conformidades com prazo expirado requerem tratamento imediato.", data: "Ontem, 19:30", periodo: "ontem", lida: true },
  { id: "n6", tipo: "documento", titulo: "ART vencida — Reforma CREA-RJ", descricao: "ART de Restauro Estrutural está vencida desde 05/05/2025.", data: "Ontem, 09:15", periodo: "ontem", lida: true },
  { id: "n7", tipo: "sistema", titulo: "Backup de dados concluído", descricao: "Rotina automática de backup executada com sucesso.", data: "Ontem, 03:00", periodo: "ontem", lida: true },
  { id: "n8", tipo: "rdo", titulo: "RDO pendente — Pátio Logístico", descricao: "Nenhum RDO enviado nas últimas 48 horas.", data: "Segunda-feira, 08:00", periodo: "semana", lida: true },
  { id: "n9", tipo: "aprovacao", titulo: "Contrato 233/2024 aprovado", descricao: "Aditivo contratual aprovado pela diretoria financeira.", data: "Terça-feira, 16:20", periodo: "semana", lida: true },
  { id: "n10", tipo: "documento", titulo: "3 documentos vencendo em 30 dias", descricao: "ARTs e laudos técnicos próximos do vencimento em diferentes obras.", data: "Segunda-feira, 10:00", periodo: "semana", lida: true },
];
