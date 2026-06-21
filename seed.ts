import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Limpar os dados atuais (cuidado ao rodar em prod!)
  await prisma.topic.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.missionLog.deleteMany();
  await prisma.user.deleteMany();

  // 1. Criar o Usuário Base
  const user = await prisma.user.create({
    data: {
      id: 'd8736e4b-90f7-4148-912c-4cc329615a20',
      email: 'lucas@solo.com',
      name: 'Lucas', // Caçador
      level: 1,
      xp: 0,
      coins: 0,
      classRole: 'Recruta',
    },
  });
  console.log(`User created: ${user.name}`);

  // 2. Criar as Disciplinas e Tópicos (Edital PPRN - Policial Penal)
  const subjectsData = [
    {
      name: 'Língua Portuguesa',
      colorHex: '#4A85D4',
      importance: 1, // Peso 1
      topics: [
        'Compreensão e interpretação de textos',
        'Tipos e gêneros textuais',
        'Significação de palavras e expressões. Sinônimos e antônimos',
        'Ortografia oficial',
        'Classes de palavras variáveis e invariáveis e suas funções no texto',
        'Concordâncias verbal e nominal',
        'Tempos simples dos verbos. Conjugações verbais',
        'Colocação de pronomes nas frases',
        'Sintaxe: termos essenciais integrantes e acessórios da oração',
        'Tipos de predicado',
        'Classificação das palavras quanto ao número de sílabas. Dígrafos, encontros',
        'Divisão silábica. Processos de formação de palavras',
      ],
    },
    {
      name: 'História do RN e Aspectos Geoeconômicos',
      colorHex: '#FF9800',
      importance: 1, // Peso 1
      topics: [
        'A Capitania do Rio Grande na história das capitanias donatárias (Século XVI)',
        'Indígenas nos sertões do Rio Grande colonial',
        'Economia e fiscalidade no período colonial',
        'A seca e a questão sanitária no Século XIX',
        'Terra dos salineiros: Trabalhadores da extração de sal',
        '30 de setembro e a política Abolicionista de Vanguarda Mossoroense',
        'Motim das Mulheres',
        'Representatividade Potiguar na comunicação (O Mossoroense)',
        'Política e sociedade: Mossoró e a resistência ao bando de Lampião',
        'O movimento de 1930 no Rio Grande do Norte',
        'A Barreira do Inferno, Trampolim da Vitória e o RN na 2ª Guerra Mundial',
        'Populações Indígenas e Comunidades Quilombolas no RN',
        'Aspectos Geoeconômicos: Atividades econômicas modernas e tradicionais',
        'Transformação da indústria das energias renováveis',
        'A Indústria Mineradora do Seridó',
      ],
    },
    {
      name: 'Ética no Serviço Público',
      colorHex: '#9C27B0',
      importance: 1, // Peso 1
      topics: [
        'Ética e Moral, princípios e valores',
        'Ética e democracia: exercício de cidadania',
        'Ética e função pública, ética no setor público',
        'Decreto Estadual nº 33.094/2023 (Código de Ética Profissional)',
        'Lei Estadual nº 11.902/2024 (Prevenção e enfrentamento ao assédio)',
      ],
    },
    {
      name: 'Direito Constitucional',
      colorHex: '#2196F3',
      importance: 2, // Peso 2
      topics: [
        'Constituição: Conceito, classificação e princípios fundamentais',
        'Aplicabilidade das normas e Interpretação constitucional',
        'Direitos e garantias fundamentais: individuais e coletivos',
        'Direitos sociais, Nacionalidade e Direitos políticos',
        'Organização do Estado e Organização político-administrativa',
        'Poder Legislativo, Executivo e Judiciário. Funções essenciais à Justiça',
        'Segurança Pública (Art. 144) e Polícia Penal',
        'Controle de Constitucionalidade',
        'Defesa do Estado (Estado de defesa e sítio) e Segurança institucional',
        'Ordem Social: Educação, saúde, meio ambiente, família e pessoa com deficiência',
      ],
    },
    {
      name: 'Direito Administrativo',
      colorHex: '#00BCD4',
      importance: 2, // Peso 2
      topics: [
        'Estado, governo e Administração Pública',
        'Direito administrativo: Conceito, Objeto e Fontes',
        'Ato administrativo: requisitos, atributos, espécies, extinção e decadência',
        'Agentes públicos: provimento, vacância, estabilidade, deveres e processo disciplinar',
        'Poderes da Administração Pública',
        'Regime jurídico-administrativo',
        'Responsabilidade civil do Estado',
        'Serviços públicos: concessão, permissão e autorização',
        'Organização administrativa (Administração direta e indireta)',
        'Controle da Administração Pública (Administrativo, judicial e legislativo)',
        'Lei de Improbidade Administrativa (Lei nº 8.429/1992)',
        'Licitações e Contratos (Lei nº 14.133/2021)',
        'Processo Administrativo RN e Bens Públicos',
        'Lei de Acesso à Informação, Lei Anticorrupção e LGPD',
      ],
    },
    {
      name: 'Direitos Humanos',
      colorHex: '#E91E63',
      importance: 2, // Peso 2
      topics: [
        'Teoria Geral: Conceito, evolução histórica e gerações',
        'Direitos Humanos na Constituição Federal',
        'Sistemas de Proteção (Global ONU, Interamericano OEA e Convenção Americana)',
        'Direitos Humanos e Segurança Pública (Uso da força, tortura)',
        'Direitos Humanos e Execução Penal (Privados de liberdade, ressocialização)',
        'Normas Internacionais: Regras de Mandela e Regras de Bangkok',
        'Tortura e Maus-Tratos',
        'Grupos Vulneráveis e Combate à discriminação',
        'Cidadania e Dignidade da pessoa humana',
      ],
    },
    {
      name: 'Execução Penal',
      colorHex: '#F44336',
      importance: 2, // Peso 2
      topics: [
        'Lei de Execução Penal (LEP) - Objetivos e aplicação',
        'Direitos e deveres da pessoa privada de liberdade. Individualização da pena',
        'Órgãos da Execução Penal (CNPCP, Juízo, MP, Defensoria, Conselho)',
        'Estabelecimentos Penais (Cadeia, penitenciária, colônia, albergado)',
        'Execução das Penas Privativas de Liberdade (Regimes e Progressão)',
        'Trabalho do preso e Remição da pena',
        'Disciplina e Segurança Prisional (Faltas e Sanções)',
        'Regime Disciplinar Diferenciado (RDD)',
        'Benefícios (Saída temporária, Livramento, Indulto e Monitoração eletrônica)',
      ],
    },
    {
      name: 'Legislação Específica',
      colorHex: '#4CAF50',
      importance: 2, // Peso 2
      topics: [
        'Constituição do Estado do Rio Grande do Norte',
        'Emenda Constitucional 104/2019 da Constituição Federal',
        'Lei Complementar Estadual nº 566/2016 e alterações',
        'Lei Complementar Estadual nº 122/1994 e alterações',
      ],
    },
    {
      name: 'Direito Penal e Processo Penal',
      colorHex: '#795548',
      importance: 2, // Peso 2
      topics: [
        'Código Penal: Aplicação da lei penal',
        'Crime: conceito, elementos, classificação e Imputabilidade',
        'Concurso de pessoas e Penas (aplicação e extinção)',
        'Crimes em Espécie (Pessoa, patrimônio, administração pública e hediondos)',
        'Legislação Penal Especial (Hediondos, Drogas, Org. Criminosa, Tortura, Abuso)',
        'Código de Processo Penal: Inquérito policial e Ação penal',
        'Jurisdição, competência e Sujeitos do processo penal',
        'Prisões e Medidas Cautelares (Flagrante, preventiva, temporária)',
        'Provas no Processo Penal (Cadeia de custódia, Busca e apreensão, Ilícitas)',
        'Procedimentos e Recursos (Comuns, Sentença, Habeas corpus e Revisão)',
        'Direitos Humanos aplicados ao Direito Penal e Processual Penal',
      ],
    },
  ];

  for (const sub of subjectsData) {
    const subject = await prisma.subject.create({
      data: {
        name: sub.name,
        colorHex: sub.colorHex,
        importance: sub.importance,
        topics: {
          create: sub.topics.map((t, idx) => ({
            title: t,
            order: idx + 1,
          })),
        },
      },
    });
    console.log(`Created subject: ${subject.name}`);
  }

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
