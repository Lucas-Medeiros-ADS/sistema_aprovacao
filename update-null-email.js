const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: { url: 'postgresql://postgres.mabevqxfctyuacolvkps:OSistema%40123@aws-1-sa-east-1.pooler.supabase.com:5432/postgres' }
  }
});

async function run() {
  try {
    const users = await prisma.user.findMany({ where: { email: null } });
    console.log("Found users with NULL email:", users.length);
    for (const u of users) {
      await prisma.user.update({
        where: { id: u.id },
        data: { email: `unknown_${u.id}@temp.com` }
      });
      console.log(`Updated user ${u.id}`);
    }
    console.log("Done.");
  } catch(e) {
    console.error("ERROR:", e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
