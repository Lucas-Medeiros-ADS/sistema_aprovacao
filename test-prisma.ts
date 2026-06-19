const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    console.log("Conectando ao Prisma...");
    const res = await prisma.user.create({
      data: {
        id: "teste-id-555",
        email: "teste555@gmail.com",
        name: "Teste",
      }
    });
    console.log("SUCESSO:", res);
  } catch(e) {
    console.log("ERRO PRISMA:");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
