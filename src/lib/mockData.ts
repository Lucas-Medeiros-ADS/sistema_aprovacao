export const mockCronogramaBase = [
  { dia: "SEGUNDA", horas: "4h", blocos: [{ nome: "Língua Portuguesa", tempo: "2h", assunto: "Compreensão e Interpretação", tipo: "TEORIA" }, { nome: "Direito Penal", tempo: "2h", assunto: "Crimes contra o Patrimônio", tipo: "QUESTÕES" }] },
  { dia: "TERÇA", horas: "4h", blocos: [{ nome: "Direito Constitucional", tempo: "2h", assunto: "Direitos Fundamentais", tipo: "TEORIA" }, { nome: "Direitos Humanos", tempo: "2h", assunto: "Pacto de San José", tipo: "QUESTÕES" }] },
  { dia: "QUARTA", horas: "4h", blocos: [{ nome: "Direito Administrativo", tempo: "2h", assunto: "Atos Administrativos", tipo: "REVISÃO" }, { nome: "Legislação Específica", tempo: "2h", assunto: "Estatuto da PM", tipo: "TEORIA" }] },
  { dia: "QUINTA", horas: "4h", blocos: [{ nome: "Ética Profissional", tempo: "2h", assunto: "Código de Ética", tipo: "TEORIA" }, { nome: "Língua Portuguesa", tempo: "2h", assunto: "Sintaxe", tipo: "QUESTÕES" }] },
  { dia: "SEXTA", horas: "4h", blocos: [{ nome: "História e Geo. RN", tempo: "2h", assunto: "Geografia Física do RN", tipo: "TEORIA" }, { nome: "Direitos Humanos", tempo: "2h", assunto: "DUDH", tipo: "QUESTÕES" }] },
  { dia: "SÁBADO", horas: "6h", blocos: [{ nome: "Revisão Geral", tempo: "3h", assunto: "Todos os tópicos da semana", tipo: "REVISÃO" }, { nome: "Simulado", tempo: "3h", assunto: "Simulado Inédito", tipo: "PRÁTICA" }] },
  { dia: "DOMINGO", horas: "5h", blocos: [{ nome: "Correção Simulado", tempo: "2h", assunto: "Análise de Erros", tipo: "REVISÃO" }, { nome: "Redação", tempo: "3h", assunto: "Tema Atualidades", tipo: "PRÁTICA" }] },
];

export function getCronogramaAtual() {
  const diasDaSemana = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
  const date = new Date();
  const diaStr = diasDaSemana[date.getDay()];
  
  return mockCronogramaBase.map(d => ({
    ...d,
    atual: d.dia === diaStr
  }));
}
