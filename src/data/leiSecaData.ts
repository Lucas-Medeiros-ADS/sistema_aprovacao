export type LeiSecaItem = {
  name: string;
  articles: string;
  link?: string;
  weight: number;
};

export type LeiSecaDayData = {
  day: number;
  items: LeiSecaItem[];
};

export const leiSecaPlan: LeiSecaDayData[] = [
  // FASE 1: BASE DE PESO 2 (Dias 1 ao 20) - LEP, Penal, Processo Penal
  { day: 1, items: [{ name: "Lei de Execução Penal (LEP)", articles: "Arts. 1º ao 27", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
  { day: 2, items: [{ name: "Lei de Execução Penal (LEP)", articles: "Arts. 28 ao 60", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
  { day: 3, items: [{ name: "Lei de Execução Penal (LEP)", articles: "Arts. 61 ao 104", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
  { day: 4, items: [{ name: "Lei de Execução Penal (LEP)", articles: "Arts. 105 ao 146", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
  { day: 5, items: [{ name: "Lei de Execução Penal (LEP)", articles: "Arts. 147 ao 204", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
  { day: 6, items: [{ name: "Código Penal (Parte Geral)", articles: "Arts. 1º ao 25", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", weight: 2 }] },
  { day: 7, items: [{ name: "Código Penal (Parte Geral)", articles: "Arts. 26 ao 58", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", weight: 2 }] },
  { day: 8, items: [{ name: "Código Penal (Parte Geral)", articles: "Arts. 59 ao 120", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", weight: 2 }] },
  { day: 9, items: [{ name: "Código Penal (Parte Especial)", articles: "Arts. 121 ao 154-B", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", weight: 2 }] },
  { day: 10, items: [{ name: "Código Penal (Parte Especial)", articles: "Arts. 155 ao 183", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", weight: 2 }] },
  { day: 11, items: [{ name: "Código Penal (Parte Especial)", articles: "Arts. 286 ao 337-P", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", weight: 2 }] },
  { day: 12, items: [{ name: "Código de Processo Penal", articles: "Arts. 4º ao 23 (Inquérito)", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm", weight: 2 }] },
  { day: 13, items: [{ name: "Código de Processo Penal", articles: "Arts. 24 ao 62 (Ação Penal)", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm", weight: 2 }] },
  { day: 14, items: [{ name: "Código de Processo Penal", articles: "Arts. 282 ao 310 (Prisão e Medidas)", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm", weight: 2 }] },
  { day: 15, items: [{ name: "Código de Processo Penal", articles: "Arts. 311 ao 350 (Prisão Prev.)", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm", weight: 2 }] },
  { day: 16, items: [{ name: "Lei de Drogas", articles: "Lei 11.343/2006 (Completa)", link: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm", weight: 2 }] },
  { day: 17, items: [{ name: "Organização Criminosa", articles: "Lei 12.850/2013", link: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm", weight: 2 }] },
  { day: 18, items: [{ name: "Tortura / Abuso de Autoridade", articles: "Lei 9.455/97 / Lei 13.869/19", link: "https://www.planalto.gov.br/ccivil_03/leis/l9455.htm", weight: 2 }] },
  { day: 19, items: [{ name: "Crimes Hediondos / Armas", articles: "Lei 8.072/90 / Lei 10.826/03", link: "https://www.planalto.gov.br/ccivil_03/leis/l8072.htm", weight: 2 }] },
  { day: 20, items: [{ name: "Legislação Específica RN", articles: "LCE RN 122/1994 (Regime Jurídico) - Parte 1", link: "https://www.al.rn.gov.br/legislacao", weight: 2 }] },
  
  // FASE 2: INTEGRAÇÃO COM PESO 1 (Dias 21 ao 40)
  { day: 21, items: [{ name: "Constituição Federal", articles: "Arts. 1º ao 4º", link: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", weight: 1 }, { name: "Lei de Execução Penal (Revisão)", articles: "Arts. 1º ao 60", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
  { day: 22, items: [{ name: "Constituição Federal", articles: "Art. 5º", link: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", weight: 1 }] },
  { day: 23, items: [{ name: "Constituição Federal", articles: "Arts. 6º ao 17", link: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", weight: 1 }] },
  { day: 24, items: [{ name: "Constituição Federal", articles: "Arts. 37 ao 41 (Adm. Pública)", link: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", weight: 1 }] },
  { day: 25, items: [{ name: "Constituição Federal", articles: "Arts. 136 ao 144 (Defesa do Estado)", link: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", weight: 1 }] },
  { day: 26, items: [{ name: "Direito Administrativo", articles: "Lei 8.429/92 (Improbidade) - Parte 1", link: "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm", weight: 1 }] },
  { day: 27, items: [{ name: "Direito Administrativo", articles: "Lei 8.429/92 (Improbidade) - Parte 2", link: "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm", weight: 1 }] },
  { day: 28, items: [{ name: "Direito Administrativo", articles: "Lei 14.133/2021 (Licitações) - Título I e II", link: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm", weight: 1 }] },
  { day: 29, items: [{ name: "Direito Administrativo", articles: "Lei 14.133/2021 (Licitações) - Contratos", link: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm", weight: 1 }] },
  { day: 30, items: [{ name: "Legislação Específica RN", articles: "LCE RN 122/1994 - Parte 2", link: "https://www.al.rn.gov.br/legislacao", weight: 2 }] },
  { day: 31, items: [{ name: "Direitos Humanos", articles: "DUDH (Declaração Universal)", link: "https://www.unicef.org/brazil/declaracao-universal-dos-direitos-humanos", weight: 1 }] },
  { day: 32, items: [{ name: "Direitos Humanos", articles: "Pacto de San José da Costa Rica", link: "https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0678.htm", weight: 1 }] },
  { day: 33, items: [{ name: "Direitos Humanos", articles: "Regras de Mandela", link: "https://www.cnj.jus.br/wp-content/uploads/2019/09/a9446aab5ecafbcf26ca821ea89fcf21.pdf", weight: 1 }] },
  { day: 34, items: [{ name: "Direitos Humanos / LEP", articles: "Convenção Contra a Tortura / LEP (Revisão Arts 61-104)", link: "https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0040.htm", weight: 2 }] },
  { day: 35, items: [{ name: "Legislação Específica RN", articles: "LCE 566/2016 (Estatuto SEAP RN)", link: "https://www.al.rn.gov.br/legislacao", weight: 2 }] },
  { day: 36, items: [{ name: "Legislação Específica RN", articles: "LCE 566/2016 (Estatuto SEAP RN) - Fim", link: "https://www.al.rn.gov.br/legislacao", weight: 2 }] },
  { day: 37, items: [{ name: "Direito Penal (Revisão)", articles: "Código Penal: Crimes contra Vida / Patrimônio", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", weight: 2 }] },
  { day: 38, items: [{ name: "Direito Administrativo", articles: "Lei 12.527/11 (LAI) e Lei 13.709/18 (LGPD)", link: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm", weight: 1 }] },
  { day: 39, items: [{ name: "Ética no Serviço Público", articles: "Decreto Estadual nº 33.094/2023", link: "https://www.al.rn.gov.br/legislacao", weight: 1 }] },
  { day: 40, items: [{ name: "Ética no Serviço Público", articles: "Lei Estadual nº 11.902/2024", link: "https://www.al.rn.gov.br/legislacao", weight: 1 }] },

  // FASE 3: CONSOLIDAÇÃO (Dias 41 ao 60)
  { day: 41, items: [{ name: "Lei de Execução Penal", articles: "Simulados e Revisão LEP (Arts 1-104)", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
  { day: 42, items: [{ name: "Lei de Execução Penal", articles: "Simulados e Revisão LEP (Arts 105-204)", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
  { day: 43, items: [{ name: "Código Penal", articles: "Revisão Geral - Parte Geral", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", weight: 2 }] },
  { day: 44, items: [{ name: "Código Penal", articles: "Revisão Geral - Parte Especial", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", weight: 2 }] },
  { day: 45, items: [{ name: "Código de Processo Penal", articles: "Revisão Inquérito e Ação Penal", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm", weight: 2 }] },
  { day: 46, items: [{ name: "Código de Processo Penal", articles: "Revisão Prisão e Medidas Cautelares", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm", weight: 2 }] },
  { day: 47, items: [{ name: "Leis Penais Especiais", articles: "Revisão Drogas, Hediondos, Tortura", link: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm", weight: 2 }] },
  { day: 48, items: [{ name: "Leis Penais Especiais", articles: "Revisão Abuso, Armas, Organização", link: "https://www.planalto.gov.br/ccivil_03/leis/l13869.htm", weight: 2 }] },
  { day: 49, items: [{ name: "Legislação Específica RN", articles: "LCE 122/1994 (Revisão Rápida)", link: "https://www.al.rn.gov.br/legislacao", weight: 2 }] },
  { day: 50, items: [{ name: "Legislação Específica RN", articles: "LCE 566/2016 e Const. RN (Revisão)", link: "https://www.al.rn.gov.br/legislacao", weight: 2 }] },
  { day: 51, items: [{ name: "Constituição Federal", articles: "Revisão Art. 5º e 144", link: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", weight: 1 }] },
  { day: 52, items: [{ name: "Direitos Humanos", articles: "Revisão DUDH e Tratados", link: "https://www.unicef.org/brazil/declaracao-universal-dos-direitos-humanos", weight: 1 }] },
  { day: 53, items: [{ name: "Direito Administrativo", articles: "Revisão Improbidade (8.429/92)", link: "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm", weight: 1 }] },
  { day: 54, items: [{ name: "Direito Administrativo", articles: "Revisão Licitações (14.133)", link: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm", weight: 1 }] },
  { day: 55, items: [{ name: "Lei de Execução Penal", articles: "LEP: Foco em Faltas e Regimes", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
  { day: 56, items: [{ name: "Código de Processo Penal", articles: "CPP: Foco em Prisões", link: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm", weight: 2 }] },
  { day: 57, items: [{ name: "Leis Penais Especiais", articles: "Drogas e Abuso (Bizu Rápido)", link: "https://www.planalto.gov.br/ccivil_03/leis/l13869.htm", weight: 2 }] },
  { day: 58, items: [{ name: "Legislação Específica RN", articles: "Estatuto SEAP RN (Decoreba Final)", link: "https://www.al.rn.gov.br/legislacao", weight: 2 }] },
  { day: 59, items: [{ name: "Ética no Serviço Público", articles: "Revisão Decretos Estaduais", link: "https://www.al.rn.gov.br/legislacao", weight: 1 }] },
  { day: 60, items: [{ name: "SIMULADO DE LEI SECA", articles: "Leitura aleatória de marcações e Lei 7.210 Completa", link: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", weight: 2 }] },
];
