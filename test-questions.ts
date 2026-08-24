import { prisma } from "./src/lib/prisma";

async function main() {
  const qs = await prisma.question.findMany({ take: 10 });
  console.log(JSON.stringify(qs, null, 2));
}

main().finally(() => process.exit(0));
