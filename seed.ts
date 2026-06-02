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
      username: 'lucas',
      password: 'password123',
      name: 'Lucas', // Caçador
      email: 'lucas@solo.com',
      level: 1,
      xp: 0,
      coins: 0,
      classRole: 'Recruta',
    },
  });
  console.log(`User created: ${user.name}`);

  // 2. Criar as Disciplinas e Tópicos (Edital PPRN)
  const subjectsData = [
    {
      name: 'Língua Portuguesa',
      colorHex: '#4A85D4',
      importance: 2,
      topics: [
        'Compreensão e interpretação de textos',
        'Tipologia e estrutura textual',
        'Ortografia e Acentuação',
        'Morfologia (Classes gramaticais)',
        'Sintaxe (Concordância e Regência)',
        'Crase',
        'Pontuação',
      ],
    },
    {
      name: 'Noções de Informática',
      colorHex: '#4CAF4C',
      importance: 1,
      topics: [
        'Conceitos de hardware e software',
        'Sistemas operacionais (Windows/Linux)',
        'Editores de texto (Word/Writer)',
        'Planilhas (Excel/Calc)',
        'Redes de Computadores e Internet',
        'Segurança da Informação',
      ],
    },
    {
      name: 'Raciocínio Lógico Matemático',
      colorHex: '#FFB800',
      importance: 1,
      topics: [
        'Estruturas lógicas',
        'Lógica de argumentação',
        'Diagramas lógicos',
        'Análise combinatória',
        'Probabilidade',
        'Matemática básica (Frações, Porcentagem)',
      ],
    },
    {
      name: 'Direito Penal',
      colorHex: '#B026FF',
      importance: 2,
      topics: [
        'Aplicação da lei penal',
        'O fato típico e seus elementos',
        'Imputabilidade penal',
        'Concurso de pessoas',
        'Penas e Medidas de segurança',
        'Crimes contra a pessoa',
        'Crimes contra o patrimônio',
        'Crimes contra a administração pública',
      ],
    },
    {
      name: 'Direito Processual Penal',
      colorHex: '#FF3333',
      importance: 2,
      topics: [
        'Inquérito policial',
        'Ação penal',
        'Prisão, medidas cautelares e liberdade provisória',
        'Provas',
        'Habeas corpus',
      ],
    },
    {
      name: 'Direito Administrativo',
      colorHex: '#00E5FF',
      importance: 2,
      topics: [
        'Princípios básicos da administração',
        'Atos administrativos',
        'Poderes administrativos',
        'Agentes públicos',
        'Controle da administração',
        'Responsabilidade civil do Estado',
      ],
    },
    {
      name: 'Legislação Extravagante',
      colorHex: '#FF00FF',
      importance: 3,
      topics: [
        'Lei de Execução Penal (LEP) - Lei nº 7.210/1984',
        'Estatuto do Desarmamento',
        'Lei de Drogas',
        'Crimes Hediondos',
        'Tortura',
        'Abuso de Autoridade',
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
