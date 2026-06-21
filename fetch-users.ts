import { prisma } from './src/lib/prisma'

async function main() {
  const users = await prisma.user.findMany()
  console.log(users.map((u: any) => ({ id: u.id, email: u.email })))
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
