import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
// import ws from 'ws';
import * as schema from './schema';

neonConfig.fetchConnectionCache = true;
// if (process.env.NODE_ENV === 'development') {
//   neonConfig.webSocketConstructor = ws;
// }

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Critical Error: DATABASE_URL is not set!");
}

// const sql = neon(process.env.DATABASE_URL!);
const sql = neon(connectionString || "");
export const db = drizzle(sql, { schema });
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// export const db = drizzle(pool, { schema });