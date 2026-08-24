const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: "postgresql://postgres.mabevqxfctyuacolvkps:OSistema%40123@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
  });
  await client.connect();
  const res = await client.query('SELECT text FROM "Question" LIMIT 5;');
  console.log(res.rows);
  await client.end();
}

main().catch(console.error);
