import { Client, type QueryResult } from 'pg'

async function query(queryObject: any) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) ?? undefined,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues()
  });

  try {
    await client.connect();
    const result = await client.query(queryObject) as QueryResult;
    return result;
  } catch (error) {
    console.error(error);
    throw error
  } finally {
    await client.end();
  }
}
export default {
  query
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA
    }
  }

  return process.env.NODE_ENV === 'development' ? false : true
}
