/* Modelo-base aplicado a toda obra nova: etapas padrão de cronograma,
   categorias de projeto, documentos base/comuns/condicionais e marcos
   críticos genéricos — para a NextLine nunca entregar uma tela vazia.
   O gestor pode remover o que não se aplica ou acrescentar algo específico. */
import { tarefasCronograma, milestones, documentosObra, projetosRevisao } from "@/mocks/demoObra";
import type { DocumentoObra, Milestone, ProjetoRevisao, TarefaCronograma } from "@/types";

function addDias(base: Date, dias: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + dias);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

let seq = 1;

export function criarDadosBaseObra(obraId: string, dataInicioStr?: string) {
  const inicio = (() => {
    if (!dataInicioStr) return new Date();
    const [dd, mm, yyyy] = dataInicioStr.split("/").map(Number);
    return dd && mm && yyyy ? new Date(yyyy, mm - 1, dd) : new Date();
  })();

  const etapas: { nome: string; disciplina: string; duracaoDias: number }[] = [
    { nome: "Mobilização e instalação de canteiro", disciplina: "Gestão", duracaoDias: 15 },
    { nome: "Fundação e estrutura", disciplina: "Estrutural", duracaoDias: 60 },
    { nome: "Instalações elétricas e hidráulicas", disciplina: "Elétrica", duracaoDias: 45 },
    { nome: "Alvenaria, vedações e acabamentos", disciplina: "Civil", duracaoDias: 60 },
    { nome: "Comissionamento e entrega", disciplina: "Gestão", duracaoDias: 15 },
  ];

  let cursor = inicio;
  const novasTarefas: TarefaCronograma[] = etapas.map((e, i) => {
    const t: TarefaCronograma = {
      id: `t-base-${obraId}-${i + 1}`,
      obraId,
      nome: e.nome,
      disciplina: e.disciplina,
      responsavel: "A definir",
      inicio: addDias(cursor, 0),
      fim: addDias(cursor, e.duracaoDias),
      progresso: 0,
      status: "no-prazo",
      visivelCliente: true,
    };
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() + e.duracaoDias);
    return t;
  });
  tarefasCronograma.push(...novasTarefas);

  const novosMarcos: Milestone[] = [
    { id: `ms-base-${obraId}-1`, obraId, nome: "Liberação estrutural", dataPrevista: novasTarefas[1].fim, status: "no-prazo" },
    { id: `ms-base-${obraId}-2`, obraId, nome: "Aprovação de projeto executivo", dataPrevista: addDias(inicio, 30), status: "no-prazo" },
    { id: `ms-base-${obraId}-3`, obraId, nome: "Entrega da obra", dataPrevista: novasTarefas[novasTarefas.length - 1].fim, status: "no-prazo" },
  ];
  milestones.push(...novosMarcos);

  const novosDocumentos: DocumentoObra[] = [
    { id: `doc-base-${obraId}-art`, obraId, nome: "ART/RRT/RT do responsável técnico", categoria: "ART / RRT / RT", grupo: "imprescindivel", status: "nao-enviado" },
    { id: `doc-base-${obraId}-contrato`, obraId, nome: "Contrato", categoria: "Contrato", grupo: "imprescindivel", status: "nao-enviado" },
    { id: `doc-base-${obraId}-memorial`, obraId, nome: "Memorial descritivo", categoria: "Memorial", grupo: "imprescindivel", status: "nao-enviado" },
    { id: `doc-base-${obraId}-liberacao`, obraId, nome: "Liberação da obra", categoria: "Liberação", grupo: "imprescindivel", status: "nao-enviado" },
    { id: `doc-base-${obraId}-seguro`, obraId, nome: "Apólice de seguro da obra", categoria: "Seguro", grupo: "comum", status: "nao-enviado" },
    { id: `doc-base-${obraId}-laudo`, obraId, nome: "Laudo estrutural", categoria: "Laudo", grupo: "comum", status: "nao-enviado" },
    { id: `doc-base-${obraId}-condominio`, obraId, nome: "Documentação do condomínio", categoria: "Outros", grupo: "condicional", status: "nao-aplicavel" },
  ];
  documentosObra.push(...novosDocumentos);

  const categoriasProjeto = ["Executivo", "Elétrica", "Hidráulica"];
  const novosProjetos: ProjetoRevisao[] = categoriasProjeto.map((cat) => ({
    id: `proj-base-${obraId}-${seq++}`,
    obraId,
    categoria: cat,
    nome: `Projeto ${cat}`,
    revisao: "REV 01",
    versaoVigente: true,
    data: addDias(inicio, 0),
    responsavel: "A definir",
    status: "em-revisao",
    resumoAlteracoes: "Revisão inicial do projeto — modelo-base criado automaticamente pela NextLine.",
    origem: "nextline",
  }));
  projetosRevisao.push(...novosProjetos);
}
