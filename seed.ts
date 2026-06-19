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
      importance: 1, // Peso 1 (15 questões)
      topics: [
        'Compreensão e interpretação de textos',
        'Tipos e gêneros textuais',
        'Significação de palavras, sinônimos e antônimos',
        'Ortografia oficial',
        'Classes de palavras',
        'Concordâncias verbal e nominal',
        'Tempos, modos e conjugações verbais',
        'Colocação pronominal',
        'Sintaxe e tipos de predicado',
        'Sílaba, divisão silábica, encontros e dígrafos',
        'Formação de palavras',
      ],
    },
    {
      name: 'História do RN e Aspectos Geoeconômicos',
      colorHex: '#FF9800',
      importance: 1, // Peso 1 (5 questões)
      topics: [
        'A Capitania do RN e período colonial',
        'Indígenas, economia e secas no século XIX',
        'Abolicionismo, Motim das Mulheres e resistência',
        'RN na Segunda Guerra e movimento de 1930',
        'Atividades econômicas modernas e tradicionais',
        'Energias renováveis e indústria mineradora',
      ],
    },
    {
      name: 'Ética no Serviço Público',
      colorHex: '#9C27B0',
      importance: 1, // Peso 1 (5 questões)
      topics: [
        'Ética e Moral, princípios e valores',
        'Ética e democracia, função pública',
        'Código de Ética Profissional (Decreto nº 33.094/2023)',
        'Prevenção ao assédio e violência (Lei nº 11.902/2024)',
      ],
    },
    {
      name: 'Direito Constitucional',
      colorHex: '#2196F3',
      importance: 1, // Peso 1 (10 questões)
      topics: [
        'Princípios fundamentais e aplicabilidade das normas',
        'Direitos e Garantias Fundamentais',
        'Organização do Estado e dos Poderes',
        'Segurança Pública (Artigo 144) e Polícia Penal',
        'Controle de Constitucionalidade',
        'Defesa do Estado (Estado de Defesa e Sítio)',
        'Ordem Social (Educação, saúde, meio ambiente)',
      ],
    },
    {
      name: 'Direito Administrativo',
      colorHex: '#00BCD4',
      importance: 1, // Peso 1 (10 questões)
      topics: [
        'Estado, governo e Administração Pública',
        'Ato administrativo',
        'Agentes públicos',
        'Poderes da Administração',
        'Regime jurídico-administrativo',
        'Responsabilidade civil do Estado',
        'Serviços públicos',
        'Organização administrativa',
        'Controle da Administração Pública',
        'Licitações e Contratos',
        'Improbidade, LRF, LAI e LGPD',
      ],
    },
    {
      name: 'Direitos Humanos',
      colorHex: '#E91E63',
      importance: 1, // Peso 1 (10 questões)
      topics: [
        'Teoria Geral, evolução e gerações',
        'Direitos Humanos na Constituição',
        'Sistemas de Proteção (Global e Interamericano)',
        'Direitos Humanos e Segurança Pública',
        'Direitos Humanos e Execução Penal',
        'Normas Internacionais (Regras de Mandela e Bangkok)',
        'Prevenção e combate à Tortura',
        'Combate à discriminação e grupos vulneráveis',
      ],
    },
    {
      name: 'Execução Penal',
      colorHex: '#F44336',
      importance: 2, // Peso 2 (15 questões)
      topics: [
        'Lei de Execução Penal (LEP) - Objetivos e aplicação',
        'Direitos e deveres da pessoa privada de liberdade',
        'Órgãos da Execução Penal',
        'Estabelecimentos Penais',
        'Execução das Penas Privativas de Liberdade e Regimes',
        'Trabalho do preso e Remição',
        'Disciplina e Segurança Prisional (Faltas, Sanções, RDD)',
        'Benefícios (Saída, Livramento, Indulto, Monitoração)',
      ],
    },
    {
      name: 'Legislação Específica',
      colorHex: '#4CAF50',
      importance: 2, // Peso 2 (20 questões)
      topics: [
        'Constituição do Estado do Rio Grande do Norte',
        'Emenda Constitucional 104/2019',
        'LCE nº 566/2016 e suas alterações',
        'LCE nº 122/1994 e suas alterações',
      ],
    },
    {
      name: 'Direito Penal e Processo Penal',
      colorHex: '#795548',
      importance: 2, // Peso 2 (10 questões)
      topics: [
        'Código Penal: Aplicação da lei, Crime e Imputabilidade',
        'Concurso de pessoas e Penas',
        'Crimes contra a pessoa e o patrimônio',
        'Crimes contra a administração pública e hediondos',
        'Legislação Especial (Drogas, Organização Criminosa, Tortura, Abuso)',
        'Inquérito policial e Ação penal',
        'Jurisdição, Prisões e Medidas Cautelares',
        'Provas e Cadeia de Custódia',
        'Procedimentos, Sentença e Recursos no Processo Penal',
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
