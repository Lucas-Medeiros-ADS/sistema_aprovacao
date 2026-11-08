import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const editaisData = [
  // ==========================================
  // 1. PMPE SOLDADO (60 Questões)
  // ==========================================
  {
    concurso: 'PMPE_SOLDADO',
    subjects: [
      {
        name: 'Língua Portuguesa',
        colorHex: '#4A85D4',
        importance: 2,
        topics: [
          'Compreensão e interpretação de textos de gêneros variados',
          'Reconhecimento de tipos e gêneros textuais',
          'Domínio da ortografia oficial e acentuação gráfica',
          'Domínio dos mecanismos de coesão e coerência textual',
          'Emprego das classes de palavras variáveis e invariáveis',
          'Relações de coordenação e subordinação entre orações e termos',
          'Emprego dos sinais de pontuação',
          'Concordância verbal e nominal',
          'Regência verbal e nominal, emprego do sinal indicativo de crase',
          'Colocação dos pronomes oblíquos átonos (próclise, mesóclise, ênclise)',
          'Reescrita e reorganização de frases e parágrafos do texto',
          'Significação das palavras: sinônimos, antônimos, homônimos e parônimos',
        ],
      },
      {
        name: 'História de Pernambuco',
        colorHex: '#FFB800',
        importance: 2,
        topics: [
          'Ocupação pré-colonial e a Capitania de Duarte Coelho',
          'Invasões Holandesas no Brasil colonial e a Insurreição Pernambucana',
          'Movimentos Nativistas e a Guerra dos Mascates',
          'A Revolução Pernambucana de 1817: causas, desdobramentos e legado',
          'Confederação do Equador (1824) e a Revolução Praieira (1848)',
          'Pernambuco no Império e na transição para a República Velha',
          'O Cangaço, coronelismo e movimentos sociais no sertão pernambucano',
          'A Era Vargas e o Estado Novo em Pernambuco',
          'Pernambuco durante o Regime Militar e o processo de redemocratização',
          'Patrimônio histórico, cultura popular e manifestações artísticas do Estado',
        ],
      },
      {
        name: 'Raciocínio Lógico',
        colorHex: '#00E5FF',
        importance: 2,
        topics: [
          'Estruturas lógicas e lógica de argumentação',
          'Proposições simples e compostas, conectivos lógicos e tabelas-verdade',
          'Equivalências lógicas e negação de proposições (Leis de De Morgan)',
          'Diagramas lógicos, quantificadores lógicos (todo, algum, nenhum)',
          'Teoria dos conjuntos e operações com conjuntos',
          'Princípios de contagem e análise combinatória (arranjo, combinação e permutação)',
          'Noções básicas de probabilidade',
          'Progressões aritméticas e geométricas (PA e PG)',
          'Razões, proporções, divisão proporcional, regra de três simples e composta',
          'Porcentagem e problemas matemáticos práticos',
        ],
      },
      {
        name: 'Informática',
        colorHex: '#9C27B0',
        importance: 2,
        topics: [
          'Sistema Operacional Windows: janelas, atalhos, pastas, cópia e movimentação de arquivos',
          'Configurações básicas do Windows, painel de controle e gerenciador de tarefas',
          'Microsoft Word: edição de texto, formatação, tabelas, cabeçalhos e estilos',
          'Microsoft Excel: células, fórmulas matemáticas, estatísticas, funções (SE, SOMA, PROCV)',
          'Microsoft PowerPoint: criação e formatação de slides, transições e modos de exibição',
          'Conceitos de redes de computadores, internet, intranet e protocolos fundamentais',
          'Navegadores web (Chrome, Edge) e ferramentas de busca na internet',
          'Correio eletrônico, ferramentas de colaboração e computação em nuvem',
          'Segurança da informação: vírus, worms, malwares, phishing, antivírus e firewall',
          'Procedimentos de backup e armazenamento de dados',
        ],
      },
      {
        name: 'Direito Constitucional',
        colorHex: '#2196F3',
        importance: 2,
        topics: [
          'Princípios Fundamentais da Constituição Federal de 1988 (arts. 1º ao 4º)',
          'Direitos e Deveres Individuais e Coletivos (art. 5º da CF/88)',
          'Remédios Constitucionais (Habeas Corpus, Mandado de Segurança, Mandado de Injunção, Habeas Data)',
          'Direitos Sociais, Nacionalidade e Direitos Políticos (arts. 6º ao 16)',
          'Organização Político-Administrativa: União, Estados, DF e Municípios',
          'Administração Pública: disposições gerais e servidores públicos civis e militares (arts. 37 ao 42)',
          'Poder Executivo: atribuições e responsabilidades do Presidente e Governadores',
          'Da Defesa do Estado e das Instituições Democráticas: Forças Armadas e Segurança Pública (art. 144)',
          'A Segurança Pública na Constituição do Estado de Pernambuco',
        ],
      },
      {
        name: 'Direitos Humanos e Legislação Extravagante',
        colorHex: '#E91E63',
        importance: 2,
        topics: [
          'Teoria Geral dos Direitos Humanos, afirmação histórica e fundamentação',
          'Declaração Universal dos Direitos Humanos (1948)',
          'Convenção Americana sobre Direitos Humanos (Pacto de São José da Costa Rica)',
          'Lei nº 13.869/2019 (Nova Lei de Abuso de Autoridade)',
          'Lei nº 9.455/1997 (Crimes de Tortura)',
          'Lei nº 8.069/1990 (Estatuto da Criança e do Adolescente - crimes e proteção)',
          'Lei nº 11.340/2006 (Lei Maria da Penha)',
          'Lei nº 10.826/2003 (Estatuto do Desarmamento)',
          'Lei nº 11.343/2006 (Lei de Drogas)',
          'Lei nº 7.716/1989 (Crimes decorrentes de preconceito de raça ou cor) e Lei nº 14.532/2023',
        ],
      },
    ],
  },

  // ==========================================
  // 2. PMPE OFICIAL QOPM (70 Questões)
  // ==========================================
  {
    concurso: 'PMPE_OFICIAL',
    subjects: [
      {
        name: 'Língua Portuguesa',
        colorHex: '#4A85D4',
        importance: 2,
        topics: [
          'Compreensão e interpretação de textos literários e não-literários',
          'Coesão e coerência textual: mecanismos morfossintáticos e semânticos',
          'Morfologia e sintaxe do período simples e composto',
          'Concordância, regência verbal/nominal e emprego da crase',
          'Pontuação e efeitos de sentido no discurso',
          'Redação oficial e argumentação jurídica',
        ],
      },
      {
        name: 'Língua Estrangeira (Inglês / Espanhol)',
        colorHex: '#607D8B',
        importance: 1,
        topics: [
          'Compreensão de textos na língua estrangeira selecionada',
          'Vocabulário contextualizado e falsos cognatos',
          'Estruturas gramaticais fundamentais',
        ],
      },
      {
        name: 'Raciocínio Lógico e Estatística',
        colorHex: '#00E5FF',
        importance: 2,
        topics: [
          'Lógica sentencial e tabelas-verdade',
          'Argumentação e deduções lógicas',
          'Análise combinatória e probabilidade',
          'Estatística descritiva: medidas de tendência central e dispersão',
          'Interpretação de gráficos e dados estatísticos',
        ],
      },
      {
        name: 'Informática',
        colorHex: '#9C27B0',
        importance: 1,
        topics: [
          'Ambiente Windows e gerenciamento de arquivos',
          'Pacote Microsoft Office 365 (Word, Excel, PowerPoint)',
          'Conceitos de redes, nuvem e navegadores',
          'Segurança da informação, golpes digitais e proteção de dados',
        ],
      },
      {
        name: 'Direito Constitucional',
        colorHex: '#2196F3',
        importance: 2,
        topics: [
          'Poder Constituinte originário e derivado, mutação constitucional',
          'Controle de Constitucionalidade (difuso e concentrado)',
          'Organização dos Poderes (Executivo, Legislativo, Judiciário)',
          'Defesa do Estado e das instituições democráticas (Estado de Defesa e Estado de Sítio)',
          'Segurança pública e papel das forças militares estaduais',
        ],
      },
      {
        name: 'Direito Administrativo',
        colorHex: '#00BCD4',
        importance: 2,
        topics: [
          'Regime Jurídico-Administrativo e princípios da Administração Pública',
          'Atos Administrativos: requisitos, atributos, anulação, revogação e convalidação',
          'Poderes da Administração Pública: hierárquico, disciplinar, regulamentar e de polícia',
          'Agentes públicos, regime estatutário e responsabilidade civil do Estado',
          'Licitações e Contratos Administrativos (Lei nº 14.133/2021)',
          'Improbidade Administrativa (Lei nº 8.429/1992 com alterações da Lei nº 14.230/2021)',
          'Processo Administrativo Disciplinar e sindicância militar',
        ],
      },
      {
        name: 'Direito Penal',
        colorHex: '#E91E63',
        importance: 2,
        topics: [
          'Aplicação da lei penal: princípios, lei no tempo e no espaço',
          'Teoria Geral do Crime: tipicidade, conduta, nexo causal, ilicitude e culpabilidade',
          'Consumação, tentativa, desistência voluntária e crime impossível',
          'Concurso de pessoas e concurso de crimes',
          'Teoria da pena: espécies, fixação da pena e causas de extinção da punibilidade',
          'Crimes contra a pessoa, patrimônio e Administração Pública',
        ],
      },
      {
        name: 'Direito Processual Penal',
        colorHex: '#F44336',
        importance: 2,
        topics: [
          'Sistemas processuais penais e princípios aplicáveis',
          'Inquérito Policial: características, instauração, tramitação e encerramento',
          'Ação Penal pública e privada',
          'Jurisdição e competência penal',
          'Teoria geral da prova penal e cadeia de custódia',
          'Prisões cautelares: flagrante, preventiva, temporária e medidas cautelares diversas',
        ],
      },
      {
        name: 'Direitos e Garantias Fundamentais',
        colorHex: '#FF5722',
        importance: 3,
        topics: [
          'Direitos e deveres individuais e coletivos (art. 5º da CF/88 aprofundado)',
          'Tratados internacionais de Direitos Humanos e incorporação ao direito brasileiro',
          'Convenção Americana sobre Direitos Humanos (Pacto de São José da Costa Rica)',
          'Jurisprudência do STF e Corte Interamericana de Direitos Humanos',
          'Uso progressivo da força e protocolos internacionais para atuação policial',
          'Proteção a grupos vulneráveis e minorias',
        ],
      },
      {
        name: 'Direito Penal Militar',
        colorHex: '#795548',
        importance: 2,
        topics: [
          'Código Penal Militar: aplicação da lei penal militar e crime militar em tempo de paz',
          'Sujeitos do crime militar, militar da ativa, da reserva e assemelhado',
          'Crimes militares contra a autoridade ou disciplina militar (motim, revolta, insubordinação)',
          'Crimes contra o serviço e o dever militar (deserção, abandono de posto)',
          'Crimes contra a administração militar e contra a pessoa no âmbito militar',
        ],
      },
      {
        name: 'Direito Processual Penal Militar',
        colorHex: '#4E342E',
        importance: 2,
        topics: [
          'Inquérito Policial Militar (IPM): instauração, competência e prazos',
          'Polícia Judiciária Militar: autoridades e atribuições',
          'Auto de Prisão em Flagrante Delito Militar',
          'Justiça Militar Estadual: organização, competência dos Conselhos de Justiça',
          'Processo penal militar ordinário e recursos',
        ],
      },
    ],
  },

  // ==========================================
  // 3. PCPE (Polícia Civil de Pernambuco - Agente)
  // ==========================================
  {
    concurso: 'PCPE',
    subjects: [
      {
        name: 'Língua Portuguesa',
        colorHex: '#4A85D4',
        importance: 2,
        topics: [
          'Compreensão e interpretação de textos de gêneros variados (Cebraspe)',
          'Reconhecimento de tipos e gêneros textuais',
          'Domínio da ortografia oficial e acentuação gráfica',
          'Mecanismos de coesão textual (conectores, referenciação e sequenciação)',
          'Emprego das classes de palavras e correlação dos tempos verbais',
          'Sintaxe da oração e do período: coordenação e subordinação',
          'Emprego dos sinais de pontuação e efeitos estilísticos',
          'Concordância e regência verbal e nominal com crase',
          'Colocação pronominal',
          'Reescritura de frases e parágrafos: substituição e reorganização',
          'Correspondência oficial: Manual de Redação da Presidência da República',
        ],
      },
      {
        name: 'Noções de Informática',
        colorHex: '#00E5FF',
        importance: 1,
        topics: [
          'Windows: fundamentos, gerenciamento de janelas, pastas e arquivos',
          'Microsoft Word: área de trabalho, formatação de documentos, tabelas, estilos',
          'Microsoft Excel: operadores, fórmulas, funções matemáticas e estatísticas',
          'Microsoft PowerPoint: apresentações, slides animados e visualizações',
          'Redes de computadores, internet, intranet, deep web e dark web',
          'Navegadores web, ferramentas de busca e correio eletrônico',
          'Segurança digital: malware, ransomware, antivírus, criptografia e backup',
        ],
      },
      {
        name: 'Raciocínio Lógico',
        colorHex: '#FF9800',
        importance: 1,
        topics: [
          'Conjuntos numéricos, razão, proporção, regra de três e porcentagem',
          'Equações, inequações de 1º e 2º graus e sistemas lineares',
          'Estruturas lógicas e lógica de argumentação (dedução e inferência)',
          'Lógica sentencial: conectivos, tabelas-verdade, equivalências e Leis de Morgan',
          'Diagramas lógicos e lógica de primeira ordem',
          'Princípios de contagem, análise combinatória e probabilidade',
          'Progressões aritméticas e geométricas (PA e PG)',
          'Problemas aritméticos, geométricos e matriciais',
        ],
      },
      {
        name: 'Contabilidade Geral',
        colorHex: '#4CAF50',
        importance: 2,
        topics: [
          'Conceitos, objetivos e finalidades da contabilidade',
          'Patrimônio: componentes, equação fundamental e situação líquida',
          'Atos e fatos administrativos: permutativos, modificativos e mistos',
          'Contas: conceitos, débitos, créditos, saldos e plano de contas',
          'Escrituração contábil: livros, fórmulas de lançamento, regimes de caixa e competência',
          'Contabilização de operações: compras, vendas, folha de pagamento, depreciação',
          'Balancete de verificação e levantamento contábil',
          'Balanço Patrimonial e Demonstração do Resultado do Exercício (DRE)',
          'Normas Brasileiras de Contabilidade aplicáveis',
        ],
      },
      {
        name: 'Estatística',
        colorHex: '#9C27B0',
        importance: 1,
        topics: [
          'Estatística descritiva e análise exploratória de dados (gráficos e tabelas)',
          'Medidas de posição (média, mediana, moda) e dispersão (variância, desvio-padrão)',
          'Assimetria e curtose',
          'Probabilidade: axiomas, probabilidade condicional e independência de eventos',
          'Técnicas de amostragem: aleatória simples, estratificada, sistemática e conglomerados',
        ],
      },
      {
        name: 'Legislação Estadual de PE',
        colorHex: '#FF5722',
        importance: 2,
        topics: [
          'Constituição do Estado de Pernambuco: artigos 101 a 105-B (Segurança Pública)',
          'Lei Estadual nº 6.425/1972 (Estatuto dos Policiais Civis de Pernambuco)',
          'Lei Estadual nº 6.123/1968 (Estatuto dos Servidores Civis de Pernambuco)',
          'Lei Complementar Estadual nº 137/2008',
          'Lei Complementar Estadual nº 317/2015',
        ],
      },
      {
        name: 'Noções de Direito Constitucional',
        colorHex: '#2196F3',
        importance: 2,
        topics: [
          'Princípios fundamentais da CF/88 e poder constituinte',
          'Aplicabilidade e eficácia das normas constitucionais',
          'Direitos e deveres individuais e coletivos (art. 5º)',
          'Organização político-administrativa do Estado brasileiro',
          'Administração pública: princípios e servidores públicos',
          'Poder Executivo, Legislativo e Judiciário',
          'Funções essenciais à justiça: Ministério Público, Advocacia e Defensoria Pública',
          'Defesa do Estado e Segurança Pública (art. 144 da CF/88 e na Carta Estadual)',
        ],
      },
      {
        name: 'Noções de Direito Administrativo',
        colorHex: '#00BCD4',
        importance: 2,
        topics: [
          'Estado, governo e princípios do regime jurídico-administrativo',
          'Atos administrativos: requisitos, atributos, espécies, anulação e revogação',
          'Poderes administrativos: hierárquico, disciplinar, regulamentar e de polícia',
          'Organização administrativa: centralização, descentralização e empresas públicas',
          'Responsabilidade civil objetiva e subjetiva do Estado',
          'Controle da administração pública: administrativo, judicial e legislativo',
          'Lei de Improbidade Administrativa (Lei nº 8.429/1992 e alterações)',
          'Agentes públicos: provimento, vacância, direitos e deveres',
          'Licitações e contratos administrativos',
        ],
      },
      {
        name: 'Noções de Direito Penal',
        colorHex: '#E91E63',
        importance: 3,
        topics: [
          'Princípios fundamentais do direito penal e aplicação da lei penal no tempo e espaço',
          'Teoria do Crime: conduta, tipicidade, ilicitude e causas de justificação',
          'Culpabilidade: imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa',
          'Crimes contra a pessoa (homicídio, lesão corporal, crimes contra a honra)',
          'Crimes contra o patrimônio (furto, roubo, extorsão, estelionato, receptação)',
          'Crimes contra a dignidade sexual',
          'Crimes contra a administração pública praticados por funcionário e particular',
          'Disposições constitucionais aplicáveis ao direito penal',
        ],
      },
      {
        name: 'Noções de Direito Processual Penal',
        colorHex: '#F44336',
        importance: 3,
        topics: [
          'Aplicação da lei processual penal no tempo, espaço e em relação às pessoas',
          'Inquérito Policial: instauração, prazos, indiciamento e arquivamento',
          'Provas penais: exame de corpo de delito, interrogatório, testemunhas, busca e apreensão',
          'Prisão em flagrante, prisão preventiva e prisão temporária (Lei nº 7.960/1989)',
          'Liberdade provisória e medidas cautelares diversas da prisão',
          'Juizados Especiais Criminais (Lei nº 9.099/1995)',
          'Investigação criminal conduzida pelo Delegado de Polícia (Lei nº 12.830/2013)',
        ],
      },
      {
        name: 'Legislação Extravagante Especial',
        colorHex: '#795548',
        importance: 3,
        topics: [
          'Lei de Crimes Hediondos (Lei nº 8.072/1990)',
          'Crimes resultantes de preconceito racial (Lei nº 7.716/1989)',
          'Lei de Abuso de Autoridade (Lei nº 13.869/2019)',
          'Lei de Tortura (Lei nº 9.455/1997)',
          'Estatuto da Criança e do Adolescente (Lei nº 8.069/1990)',
          'Lei das Organizações Criminosas (Lei nº 12.850/2013)',
          'Crimes de Trânsito no Código de Trânsito Brasileiro (Lei nº 9.503/1997)',
          'Lei Maria da Penha (Lei nº 11.340/2006)',
          'Lei de Drogas (Lei nº 11.343/2006)',
          'Lei Henry Borel (Lei nº 14.344/2022)',
          'Crimes Ambientais (Lei nº 9.605/1998)',
          'Estatuto do Desarmamento (Lei nº 10.826/2003)',
        ],
      },
    ],
  },

  // ==========================================
  // 4. PPPE (Polícia Penal de Pernambuco)
  // Prova em 21/03/2027
  // ==========================================
  {
    concurso: 'PPPE',
    subjects: [
      {
        name: 'Língua Portuguesa',
        colorHex: '#4A85D4',
        importance: 2,
        topics: [
          'Compreensão e interpretação de textos de gêneros variados',
          'Reconhecimento de tipos e gêneros textuais',
          'Domínio da ortografia oficial e acentuação gráfica',
          'Mecanismos de coesão textual: referenciação, substituição e conectores',
          'Emprego e correlação de tempos e modos verbais',
          'Estrutura morfossintática do período: coordenação e subordinação',
          'Emprego dos sinais de pontuação',
          'Concordância e regência verbal e nominal com uso de crase',
          'Colocação pronominal dos pronomes átonos',
          'Reescritura e retextualização em diferentes níveis de formalidade',
        ],
      },
      {
        name: 'Ética no Serviço Público',
        colorHex: '#9C27B0',
        importance: 1,
        topics: [
          'Ética e moral: conceitos fundamentais, princípios e valores republicanos',
          'Ética e democracia: o exercício responsável da cidadania',
          'Ética e a função pública no sistema penitenciário',
          'Procedimentos disciplinares da Lei nº 8.112/1990: sindicâncias e PAD',
          'Comissão disciplinar, requisitos, prazos, suspeição e julgamento',
          'Código de Ética dos Agentes Públicos do Estado de Pernambuco (Decreto nº 46.852/2018)',
        ],
      },
      {
        name: 'Legislação Estadual de Pernambuco',
        colorHex: '#FF5722',
        importance: 2,
        topics: [
          'Código Penitenciário do Estado de Pernambuco (Lei Estadual nº 15.755/2016)',
          'Normas Disciplinares dos Policiais Penais de Pernambuco (LC Estadual nº 106/2007)',
          'Constituição do Estado de Pernambuco e suas atualizações',
          'Atribuições do cargo de Policial Penal de PE (LC Estadual nº 422/2019)',
          'Lei Complementar Estadual nº 150/2009',
          'Regime Jurídico dos Funcionários Civis de Pernambuco (Lei Estadual nº 6.123/1968)',
          'Lei Complementar Estadual nº 487/2022',
          'Emenda Constitucional Estadual nº 53/2020 (Criação da Polícia Penal de PE)',
        ],
      },
      {
        name: 'Noções de Informática e LGPD',
        colorHex: '#00E5FF',
        importance: 1,
        topics: [
          'Sistema Operacional Windows: navegação, arquivos, pastas e ferramentas',
          'Edição de textos, planilhas e apresentações (Microsoft Office 365)',
          'Redes de computadores, internet, intranet e segurança de conexão',
          'Navegadores web (Microsoft Edge e Google Chrome) e buscas avançadas',
          'Gerenciamento seguro de informações, pastas e nuvem',
          'Segurança da informação e procedimentos preventivos contra ataques cibernéticos',
          'Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)',
        ],
      },
      {
        name: 'Direito Administrativo',
        colorHex: '#00BCD4',
        importance: 2,
        topics: [
          'Conceito, fontes e regime jurídico-administrativo (supremacia e indisponibilidade do interesse público)',
          'Princípios expressos e implícitos da Administração Pública',
          'Organização administrativa: órgãos públicos, descentralização e administração indireta',
          'Atos administrativos: requisitos, atributos, vícios, convalidação, revogação e anulação',
          'Poderes administrativos: hierárquico, disciplinar, regulamentar e poder de polícia penitenciária',
          'Bens públicos e intervenção do Estado na propriedade',
          'Licitações e Contratos Administrativos (Lei nº 14.133/2021) e Parcerias Público-Privadas',
          'Controle e responsabilização da administração: administrativo, judicial e legislativo',
          'Agentes públicos: classificação, provimento, vacância e responsabilidades',
          'Processo Administrativo Estadual e Federal (Lei nº 9.784/1999)',
          'Lei de Improbidade Administrativa (Lei nº 8.429/1992 e alterações)',
        ],
      },
      {
        name: 'Direito Constitucional',
        colorHex: '#2196F3',
        importance: 2,
        topics: [
          'Teoria da Constituição, princípios fundamentais e aplicabilidade das normas',
          'Poder constituinte originário e derivado, mutação constitucional',
          'Direitos e Garantias Fundamentais: individuais, coletivos e remédios constitucionais',
          'Direitos Sociais, Nacionalidade e Direitos Políticos',
          'Organização Político-Administrativa: União, Estados, Municípios e Intervenção Federal',
          'Administração Pública: disposições gerais e servidores públicos',
          'Organização dos Poderes (Executivo, Legislativo, Judiciário) e Funções Essenciais à Justiça',
          'Controle de Constitucionalidade: difuso e concentrado (ADI, ADC, ADPF)',
          'Defesa do Estado, Segurança Pública e a Polícia Penal (art. 144 da CF/88)',
          'Reforma da Previdência (EC nº 103/2019) e direitos das comunidades tradicionais',
        ],
      },
      {
        name: 'Direito Penal',
        colorHex: '#E91E63',
        importance: 3,
        topics: [
          'Aplicação da lei penal: legalidade, anterioridade, lei penal no tempo e no espaço',
          'Teoria Geral do Crime: conduta, tipicidade, fato típico e seus elementos',
          'Ilicitude e causas excludentes da ilicitude (legítima defesa, estado de necessidade)',
          'Culpabilidade: imputabilidade, erro de proibição e excludentes',
          'Concurso de pessoas e concurso de crimes',
          'Crimes contra a pessoa (homicídio, lesão corporal, periclitação da vida)',
          'Crimes contra o patrimônio (furto, roubo, extorsão, apropriação indébita)',
          'Crimes contra a dignidade sexual e contra a paz pública',
          'Crimes contra a Administração Pública (peculato, concussão, corrupção, prevaricação, desobediência)',
        ],
      },
      {
        name: 'Direito Processual Penal',
        colorHex: '#F44336',
        importance: 3,
        topics: [
          'Princípios processuais penais e aplicação da lei processual',
          'Inquérito Policial: finalidade, características, instauração, prazos e conclusão',
          'Ação penal: espécies, condições e sujeitos processuais',
          'Competência processual penal e Juizados Especiais Criminais',
          'Teoria das Provas: exame de corpo de delito, cadeia de custódia, perícias, busca e apreensão',
          'Prisão: espécies, prisão em flagrante, preventiva, temporária e liberdade provisória com fiança',
          'Medidas cautelares diversas da prisão e monitoração eletrônica',
          'Processo criminal comum e crimes praticados por funcionários públicos',
        ],
      },
      {
        name: 'Legislação Especial Prisional e Penal',
        colorHex: '#FF9800',
        importance: 3,
        topics: [
          'Lei de Drogas (Lei nº 11.343/2006)',
          'Lei de Abuso de Autoridade (Lei nº 13.869/2019)',
          'Crimes de Tortura (Lei nº 9.455/1997)',
          'Estatuto do Desarmamento (Lei nº 10.826/2003)',
          'Crimes Hediondos (Lei nº 8.072/1990)',
          'Lei das Organizações Criminosas (Lei nº 12.850/2013)',
          'Marco Legal do Combate ao Crime Organizado (Lei nº 15.358/2026)',
          'Interceptação Telefônica e Telemática (Lei nº 9.296/1996)',
          'Lavagem de Dinheiro (Lei nº 9.613/1998)',
          'Lei Maria da Penha (Lei nº 11.340/2006)',
          'Estatuto da Pessoa Idosa (Lei nº 10.741/2003) e Estatuto da Criança e do Adolescente',
          'Investigação Criminal (Lei nº 12.830/2013)',
        ],
      },
      {
        name: 'Execução Penal (LEP e Normativas)',
        colorHex: '#D32F2F',
        importance: 3,
        topics: [
          'Lei de Execução Penal (Lei nº 7.210/1984): objetivos, classificação e assistência ao preso',
          'Direitos e deveres da pessoa privada de liberdade e disciplina prisional',
          'Faltas disciplinares leves, médias e graves e sanções disciplinares',
          'Regime Disciplinar Diferenciado (RDD) e inclusão preventiva',
          'Órgãos da Execução Penal (CNPCP, Juiz da Execução, MP, Defensoria, Conselhos)',
          'Estabelecimentos penais e Sistema Penitenciário Federal (Lei nº 11.671/2008 e Decreto nº 6.877/2009)',
          'Regimes de cumprimento de pena: fechado, semiaberto e aberto (progressão e regressão)',
          'Trabalho do preso, remição de pena pelo trabalho e pelo estudo',
          'Benefícios da execução: saída temporária, livramento condicional e indulto',
          'Atenção Integral à Saúde das Pessoas Privadas de Liberdade (Portaria MS/MJ nº 1/2014)',
          'Resoluções do CNPCP (saúde mental, diretrizes de educação e proporção policial/preso)',
          'Atenção às Mulheres em Situação de Privação de Liberdade (Portaria MJ/SPM nº 210/2014)',
        ],
      },
      {
        name: 'Noções de Direitos Humanos e Participação Social',
        colorHex: '#8BC34A',
        importance: 2,
        topics: [
          'Teoria Geral dos Direitos Humanos, estrutura normativa e afirmação histórica',
          'Direitos humanos na Constituição Federal e responsabilidade internacional do Estado',
          'Declaração Universal dos Direitos Humanos (ONU, 1948)',
          'Pacto de São José da Costa Rica (Convenção Americana sobre Direitos Humanos - Decreto nº 678/1992)',
          'Regras Mínimas da ONU para o Tratamento de Pessoas Presas (Regras de Nelson Mandela)',
          'Regras de Bangkok para o tratamento de mulheres presas',
          'Programa Nacional de Direitos Humanos (PNDH-3 - Decreto nº 7.037/2009)',
          'Conselho Nacional de Política Criminal e Penitenciária (arts. 62 a 64 da LEP)',
          'Conselhos Penitenciários e Conselhos da Comunidade na Execução Penal',
        ],
      },
    ],
  },
];

async function main() {
  console.log('🚀 Iniciando o Seed dos 4 Editais (PMPE Soldado, PMPE Oficial, PCPE e PPPE)...');

  for (const edital of editaisData) {
    console.log(`\n📌 Processando concurso: ${edital.concurso}...`);

    // Limpar apenas as matérias do concurso correspondente para não afetar outros dados
    const existing = await prisma.subject.findMany({
      where: { concurso: edital.concurso },
      select: { id: true },
    });

    if (existing.length > 0) {
      await prisma.topic.deleteMany({
        where: { subjectId: { in: existing.map(s => s.id) } },
      });
      await prisma.subject.deleteMany({
        where: { concurso: edital.concurso },
      });
      console.log(`   Removidas ${existing.length} matérias antigas do concurso ${edital.concurso}.`);
    }

    for (const sub of edital.subjects) {
      const created = await prisma.subject.create({
        data: {
          name: sub.name,
          concurso: edital.concurso,
          colorHex: sub.colorHex,
          importance: sub.importance,
          topics: {
            create: sub.topics.map((t, idx) => ({
              title: t,
              order: idx + 1,
            })),
          },
        },
        include: { topics: true },
      });
      console.log(`   ✅ Matéria criada: ${created.name} (${created.topics.length} tópicos)`);
    }
  }

  console.log('\n🎉 Seed dos 4 Editais concluído com sucesso total!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

