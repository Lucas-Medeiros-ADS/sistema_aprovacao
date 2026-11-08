export interface CronogramaBloco {
  nome: string;
  tempo: string;
  assunto: string;
  tipo: "TEORIA" | "QUESTÕES" | "REVISÃO" | "PRÁTICA";
}

export interface CronogramaDia {
  dia: string;
  horas: string;
  blocos: CronogramaBloco[];
  atual?: boolean;
}

export interface ConcursoInfo {
  id: string;
  sigla: string;
  nome: string;
  cargo: string;
  banca: string;
  vagas: string;
  remuneracao: string;
  dataProva: string; // ISO ou data formatada
  dataProvaDisplay: string;
  status: "CONFIRMADO" | "EDITAL PUBLICADO" | "EM ANDAMENTO" | "INSCRIÇÕES ABERTAS";
  badgeColor: string;
  corHex: string;
  descricao: string;
  resumoQuestoes: { disciplina: string; questoes: number; peso: number }[];
  criteriosEliminacao: string[];
}

export const CONCURSOS_CONFIG: Record<string, ConcursoInfo> = {
  PMPE_SOLDADO: {
    id: "PMPE_SOLDADO",
    sigla: "PMPE",
    nome: "Polícia Militar de Pernambuco",
    cargo: "Soldado da Polícia Militar",
    banca: "Instituto AOCP / SDS-PE",
    vagas: "2.400 Vagas",
    remuneracao: "R$ 3.419,88 a R$ 4.200,00",
    dataProva: "2026-10-18T08:00:00-03:00",
    dataProvaDisplay: "18 de Outubro de 2026 (Previsão)",
    status: "CONFIRMADO",
    badgeColor: "border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/10",
    corHex: "#00E5FF",
    descricao: "Incursão Operacional Tática para Soldado da PMPE. 60 Questões Objetivas + Redação Dissertativa (40 pts).",
    resumoQuestoes: [
      { disciplina: "Língua Portuguesa", questoes: 10, peso: 1 },
      { disciplina: "História de Pernambuco", questoes: 10, peso: 1 },
      { disciplina: "Raciocínio Lógico", questoes: 10, peso: 1 },
      { disciplina: "Informática", questoes: 10, peso: 1 },
      { disciplina: "Direito Constitucional", questoes: 10, peso: 1 },
      { disciplina: "Direitos Humanos e Legislação Extravagante", questoes: 10, peso: 1 },
    ],
    criteriosEliminacao: [
      "Mínimo de 30% em cada bloco/disciplina (não zerar)",
      "Mínimo de 30% da pontuação máxima total na Prova Objetiva",
      "Redação (40 pontos): Mínimo de 12 pontos (30%) para aprovação",
      "Classificação até o limite estabelecido no edital para correção da discursiva e TAF",
    ],
  },
  PMPE_OFICIAL: {
    id: "PMPE_OFICIAL",
    sigla: "PMPE OFICIAL",
    nome: "Polícia Militar de Pernambuco",
    cargo: "Oficial da PMPE (QOPM - 2º Tenente)",
    banca: "Instituto AOCP / SDS-PE",
    vagas: "300 Vagas",
    remuneracao: "R$ 10.855,91 (Após CFO)",
    dataProva: "2026-11-22T08:00:00-03:00",
    dataProvaDisplay: "22 de Novembro de 2026 (Previsão)",
    status: "CONFIRMADO",
    badgeColor: "border-[#FFB800] text-[#FFB800] bg-[#FFB800]/10",
    corHex: "#FFB800",
    descricao: "Comando e Liderança Policial Militar. Exige Bacharelado em Direito. 70 Questões Objetivas + Redação Dissertativa.",
    resumoQuestoes: [
      { disciplina: "Língua Portuguesa", questoes: 10, peso: 1 },
      { disciplina: "Língua Estrangeira (Inglês/Espanhol)", questoes: 5, peso: 1 },
      { disciplina: "Raciocínio Lógico", questoes: 5, peso: 1 },
      { disciplina: "Estatística", questoes: 5, peso: 1 },
      { disciplina: "Informática", questoes: 5, peso: 1 },
      { disciplina: "Direito Constitucional", questoes: 5, peso: 1 },
      { disciplina: "Direito Administrativo", questoes: 5, peso: 1 },
      { disciplina: "Direito Penal", questoes: 5, peso: 1 },
      { disciplina: "Direito Processual Penal", questoes: 5, peso: 1 },
      { disciplina: "Direitos e Garantias Fundamentais", questoes: 10, peso: 1 },
      { disciplina: "Direito Penal Militar", questoes: 5, peso: 1 },
      { disciplina: "Direito Processual Penal Militar", questoes: 5, peso: 1 },
    ],
    criteriosEliminacao: [
      "Exigência: Bacharelado em Direito",
      "Mínimo de 30% em cada disciplina",
      "Mínimo de 30% de acertos no total das 70 questões objetivas",
      "Redação (30 pontos): Mínimo de 9 pontos (30%) para não ser eliminado",
    ],
  },
  PCPE: {
    id: "PCPE",
    sigla: "PCPE",
    nome: "Polícia Civil de Pernambuco",
    cargo: "Agente de Polícia Civil",
    banca: "Cebraspe",
    vagas: "440 Vagas (400 Agente + 40 PcD)",
    remuneracao: "R$ 4.700,00 a R$ 6.500,00",
    dataProva: "2026-12-06T08:00:00-03:00",
    dataProvaDisplay: "06 de Dezembro de 2026 (Previsão)",
    status: "CONFIRMADO",
    badgeColor: "border-[#B026FF] text-[#B026FF] bg-[#B026FF]/10",
    corHex: "#B026FF",
    descricao: "Investigação e Inteligência Policial Civil. Estilo Cebraspe Certo/Errado. 60 Questões + Discursiva de Atualidades.",
    resumoQuestoes: [
      { disciplina: "Noções de Direito (Estadual, Const., Adm., Penal, Proc. Penal)", questoes: 25, peso: 1 },
      { disciplina: "Língua Portuguesa", questoes: 10, peso: 1 },
      { disciplina: "Noções de Informática", questoes: 8, peso: 1 },
      { disciplina: "Raciocínio Lógico", questoes: 7, peso: 1 },
      { disciplina: "Contabilidade Geral", questoes: 5, peso: 1 },
      { disciplina: "Estatística", questoes: 5, peso: 1 },
    ],
    criteriosEliminacao: [
      "Metodologia Cebraspe: 1 erro anula 1 acerto",
      "Nota mínima na Prova Objetiva: 24 pontos líquidos",
      "Prova Discursiva (30 pontos): Mínimo de 15 pontos em tema de Atualidades da Segurança Pública",
      "Habilitação de condutor (CNH B no mínimo)",
    ],
  },
  PPPE: {
    id: "PPPE",
    sigla: "PPPE",
    nome: "Polícia Penal de Pernambuco",
    cargo: "Policial Penal do Estado",
    banca: "Cebraspe",
    vagas: "700 Vagas (537 M / 163 F)",
    remuneracao: "R$ 4.500,00 a R$ 5.800,00",
    dataProva: "2027-03-21T08:00:00-03:00",
    dataProvaDisplay: "21 de Março de 2027 (Data Oficial do Edital)",
    status: "EDITAL PUBLICADO",
    badgeColor: "border-[#FF3366] text-[#FF3366] bg-[#FF3366]/10",
    corHex: "#FF3366",
    descricao: "Gestão, Segurança e Custódia Prisional. Inscrições: 12/11/2026 a 04/01/2027. Prova Oficial em 21/03/2027.",
    resumoQuestoes: [
      { disciplina: "P1 Conhecimentos Gerais (Português, Ética, Legislação PE, Informática)", questoes: 20, peso: 1 },
      { disciplina: "P2 Conhecimentos Específicos (Adm, Const, Penal, Proc Penal, Leg Especial, LEP, DH)", questoes: 40, peso: 1 },
      { disciplina: "P3 Prova Discursiva (Texto dissertativo até 30 linhas)", questoes: 1, peso: 10 },
    ],
    criteriosEliminacao: [
      "Nota Final na Prova Objetiva (NFPO) ≥ 30,00 pontos",
      "Não zerar nenhuma das áreas de conhecimento (P1 e P2)",
      "Prova Discursiva (10 pontos): Mínimo de 5,00 pontos para aprovação",
      "Classificação até o limite para envio de documentos e TAF de 12 a 18/08/2027",
    ],
  },
};

export const CRONOGRAMAS_POR_CONCURSO: Record<string, CronogramaDia[]> = {
  PMPE_SOLDADO: [
    {
      dia: "SEGUNDA",
      horas: "4h",
      blocos: [
        { nome: "Língua Portuguesa", tempo: "2h", assunto: "Compreensão e Interpretação de Textos", tipo: "TEORIA" },
        { nome: "Direito Constitucional", tempo: "2h", assunto: "Art. 5º - Direitos e Deveres Individuais", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "TERÇA",
      horas: "4h",
      blocos: [
        { nome: "História de Pernambuco", tempo: "2h", assunto: "Invasões Holandesas e Insurreição Pernambucana", tipo: "TEORIA" },
        { nome: "Raciocínio Lógico", tempo: "2h", assunto: "Lógica Proposicional e Tabela-Verdade", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "QUARTA",
      horas: "4h",
      blocos: [
        { nome: "Informática", tempo: "2h", assunto: "Windows e Microsoft Word / Excel", tipo: "TEORIA" },
        { nome: "Direitos Humanos", tempo: "2h", assunto: "Lei nº 13.869/2019 (Abuso de Autoridade)", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "QUINTA",
      horas: "4h",
      blocos: [
        { nome: "Língua Portuguesa", tempo: "2h", assunto: "Sintaxe, Concordância e Regência com Crase", tipo: "QUESTÕES" },
        { nome: "História de Pernambuco", tempo: "2h", assunto: "Revolução de 1817 e Confederação do Equador", tipo: "REVISÃO" },
      ],
    },
    {
      dia: "SEXTA",
      horas: "4h",
      blocos: [
        { nome: "Direito Constitucional", tempo: "2h", assunto: "Art. 144 - Segurança Pública e Constituição PE", tipo: "TEORIA" },
        { nome: "Legislação Extravagante", tempo: "2h", assunto: "Lei Maria da Penha e Lei de Drogas", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "SÁBADO",
      horas: "5h",
      blocos: [
        { nome: "Simulado PMPE Soldado", tempo: "3h", assunto: "60 Questões (Padrão Instituto AOCP)", tipo: "PRÁTICA" },
        { nome: "Revisão dos Erros", tempo: "2h", assunto: "Caderno de Erros e Tópicos Fracos", tipo: "REVISÃO" },
      ],
    },
    {
      dia: "DOMINGO",
      horas: "4h",
      blocos: [
        { nome: "Redação Dissertativa", tempo: "2h", assunto: "Estrutura Dissertativa e Temas de Segurança", tipo: "PRÁTICA" },
        { nome: "Revisão Semanal Flashcards", tempo: "2h", assunto: "História PE + Leis Extravagantes", tipo: "REVISÃO" },
      ],
    },
  ],

  PMPE_OFICIAL: [
    {
      dia: "SEGUNDA",
      horas: "5h",
      blocos: [
        { nome: "Direito Penal Militar", tempo: "2h30", assunto: "Crimes contra a Autoridade Militar e Insubordinação", tipo: "TEORIA" },
        { nome: "Direito Processual Penal Militar", tempo: "2h30", assunto: "Inquérito Policial Militar (IPM) e APFD Militar", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "TERÇA",
      horas: "5h",
      blocos: [
        { nome: "Direito Constitucional", tempo: "2h30", assunto: "Controle de Constitucionalidade e Defesa do Estado", tipo: "TEORIA" },
        { nome: "Direitos e Garantias", tempo: "2h30", assunto: "Pacto de San José e Jurisprudência da Corte IDH", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "QUARTA",
      horas: "5h",
      blocos: [
        { nome: "Direito Penal", tempo: "2h30", assunto: "Teoria do Delito, Tipicidade e Ilicitude", tipo: "TEORIA" },
        { nome: "Direito Processual Penal", tempo: "2h30", assunto: "Inquérito Policial e Prisões Cautelares", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "QUINTA",
      horas: "5h",
      blocos: [
        { nome: "Direito Administrativo", tempo: "2h30", assunto: "Atos Administrativos, Poder de Polícia e PAD", tipo: "TEORIA" },
        { nome: "Língua Portuguesa", tempo: "2h30", assunto: "Morfossintaxe e Redação Jurídica Oficial", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "SEXTA",
      horas: "5h",
      blocos: [
        { nome: "Raciocínio Lógico & Estatística", tempo: "2h30", assunto: "Análise Combinatória e Estatística Descritiva", tipo: "TEORIA" },
        { nome: "Língua Estrangeira & Informática", tempo: "2h30", assunto: "Textos Técnicos e Segurança da Informação", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "SÁBADO",
      horas: "6h",
      blocos: [
        { nome: "Simulado PMPE Oficial", tempo: "3h30", assunto: "70 Questões Jurídicas Aprofundadas", tipo: "PRÁTICA" },
        { nome: "Análise e Correção Detalhada", tempo: "2h30", assunto: "Caderno de Erros Jurídico", tipo: "REVISÃO" },
      ],
    },
    {
      dia: "DOMINGO",
      horas: "4h",
      blocos: [
        { nome: "Redação Dissertativa Jurídica", tempo: "2h", assunto: "Parecer / Dissertação em Segurança e Direitos Humanos", tipo: "PRÁTICA" },
        { nome: "Revisão Geral da Semana", tempo: "2h", assunto: "Letra da Lei Penal Militar e CF/88", tipo: "REVISÃO" },
      ],
    },
  ],

  PCPE: [
    {
      dia: "SEGUNDA",
      horas: "5h",
      blocos: [
        { nome: "Contabilidade Geral", tempo: "2h30", assunto: "Equação Patrimonial, Lançamentos e Razonetes", tipo: "TEORIA" },
        { nome: "Língua Portuguesa (Cebraspe)", tempo: "2h30", assunto: "Reescritura de Frases e Interpretação de Texto", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "TERÇA",
      horas: "5h",
      blocos: [
        { nome: "Noções de Direito Penal", tempo: "2h30", assunto: "Crimes Contra a Pessoa e Patrimônio", tipo: "TEORIA" },
        { nome: "Direito Processual Penal", tempo: "2h30", assunto: "Provas Ilícitas, Busca e Apreensão, Prisões", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "QUARTA",
      horas: "5h",
      blocos: [
        { nome: "Estatística", tempo: "2h30", assunto: "Medidas de Dispersão e Amostragem", tipo: "TEORIA" },
        { nome: "Noções de Informática", tempo: "2h30", assunto: "Redes, Dark Web, Segurança e Criptografia", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "QUINTA",
      horas: "5h",
      blocos: [
        { nome: "Legislação Extravagante", tempo: "2h30", assunto: "Lei das Organizações Criminosas e Lavagem de Capitais", tipo: "TEORIA" },
        { nome: "Legislação Estadual de PE", tempo: "2h30", assunto: "Estatuto PCPE (Lei 6.425/72) e CF Estadual", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "SEXTA",
      horas: "5h",
      blocos: [
        { nome: "Direito Administrativo e Const.", tempo: "2h30", assunto: "Poder de Polícia, Improbidade e Servidores Públicos", tipo: "QUESTÕES" },
        { nome: "Raciocínio Lógico Matemático", tempo: "2h30", assunto: "Equivalências e Negações de Proposições", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "SÁBADO",
      horas: "6h",
      blocos: [
        { nome: "Simulado PCPE Cebraspe", tempo: "3h30", assunto: "60 Questões Modelo Certo/Errado com Fator de Correção", tipo: "PRÁTICA" },
        { nome: "Auditoria de Resoluções", tempo: "2h30", assunto: "Diagnóstico de Questões Duvidosas e Chutes", tipo: "REVISÃO" },
      ],
    },
    {
      dia: "DOMINGO",
      horas: "4h",
      blocos: [
        { nome: "Discursiva de Atualidades", tempo: "2h", assunto: "Tema de Segurança Pública e Direitos Humanos", tipo: "PRÁTICA" },
        { nome: "Revisão Ativa Contabilidade", tempo: "2h", assunto: "Fórmulas, DRE e Balanço Patrimonial", tipo: "REVISÃO" },
      ],
    },
  ],

  PPPE: [
    {
      dia: "SEGUNDA",
      horas: "5h",
      blocos: [
        { nome: "Execução Penal (LEP)", tempo: "2h30", assunto: "Regimes Prisionais, RDD e Faltas Disciplinares", tipo: "TEORIA" },
        { nome: "Língua Portuguesa (Cebraspe)", tempo: "2h30", assunto: "Interpretação e Mecanismos de Coesão Textual", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "TERÇA",
      horas: "5h",
      blocos: [
        { nome: "Direito Penal", tempo: "2h30", assunto: "Crimes contra a Administração Pública e Peculato", tipo: "TEORIA" },
        { nome: "Direito Processual Penal", tempo: "2h30", assunto: "Prisões Cautelares e Medidas Alternativas à Prisão", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "QUARTA",
      horas: "5h",
      blocos: [
        { nome: "Legislação Especial Prisional", tempo: "2h30", assunto: "Abuso de Autoridade (Lei 13.869) e Tortura (Lei 9.455)", tipo: "TEORIA" },
        { nome: "Legislação Estadual de PE", tempo: "2h30", assunto: "Código Penitenciário PE (Lei 15.755/16) e LC 106/07", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "QUINTA",
      horas: "5h",
      blocos: [
        { nome: "Direito Administrativo e Ética", tempo: "2h30", assunto: "Poder de Polícia, Improbidade e Código de Ética PE", tipo: "TEORIA" },
        { nome: "Direito Constitucional", tempo: "2h30", assunto: "Art. 144 (Polícia Penal) e Direitos Fundamentais", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "SEXTA",
      horas: "5h",
      blocos: [
        { nome: "Direitos Humanos e Regras Mandela", tempo: "2h30", assunto: "Regras de Nelson Mandela e Direitos do Preso", tipo: "TEORIA" },
        { nome: "Informática e LGPD", tempo: "2h30", assunto: "Segurança da Informação e Lei Geral de Proteção de Dados", tipo: "QUESTÕES" },
      ],
    },
    {
      dia: "SÁBADO",
      horas: "6h",
      blocos: [
        { nome: "Simulado Oficial PPPE Cebraspe", tempo: "3h30", assunto: "60 Questões (20 P1 Gerais + 40 P2 Específicos)", tipo: "PRÁTICA" },
        { nome: "Correção de Rota e Erros", tempo: "2h30", assunto: "Análise das Questões Eradas e Tópicos Críticos", tipo: "REVISÃO" },
      ],
    },
    {
      dia: "DOMINGO",
      horas: "4h",
      blocos: [
        { nome: "Discursiva P3 (Até 30 Linhas)", tempo: "2h", assunto: "Segurança Prisional e Direitos Humanos", tipo: "PRÁTICA" },
        { nome: "Revisão da Letra da Lei (LEP)", tempo: "2h", assunto: "Artigos mais cobrados da Lei 7.210/1984", tipo: "REVISÃO" },
      ],
    },
  ],
};

export function getCronogramaPorConcurso(concursoId: string): CronogramaDia[] {
  const diasDaSemana = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
  const date = new Date();
  const diaStr = diasDaSemana[date.getDay()];

  const cronograma = CRONOGRAMAS_POR_CONCURSO[concursoId] || CRONOGRAMAS_POR_CONCURSO.PMPE_SOLDADO;

  return cronograma.map(d => ({
    ...d,
    atual: d.dia === diaStr,
  }));
}

