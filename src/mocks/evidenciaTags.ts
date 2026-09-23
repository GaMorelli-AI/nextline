/* Tipologias/tags de classificação de evidências — compartilhadas entre obras.
   Mutáveis em memória: "+ Criar nova tipologia" no modal de evidências adiciona
   aqui diretamente. O administrador padroniza/organiza depois em Configurações. */
export const tagsAmbiente = [
  "Cozinha", "Suíte Master", "Sala", "Suíte 02", "Varanda",
  "Pavimento 2", "Ala Leste", "Térreo", "Sala de Servidores", "Fachada", "Subsolo",
];

export const tagsFornecedor = [
  "Marcenaria Fortes", "Marmoraria Alfa", "Vidraçaria Cristal", "ENGIX Engenharia", "Automação SmartHome", "Pintura Renove",
];

export const tagsItem = ["Bancada", "Armário", "Porta", "Janela", "Piso", "Forro", "Tomada", "Luminária"];

export const tagsDisciplina = [
  "Marcenaria", "Vidraçaria", "Elétrica", "Pintura", "Civil", "Climatização", "Estrutural", "Hidráulica",
];

export const tagsAtividade = ["Instalação", "Medição", "Vistoria", "Acabamento", "Entrega", "Conferência"];

export const tagsStatus = ["Concluído", "Em andamento", "Pendente", "Não conforme"];
