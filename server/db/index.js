import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
  family: 4,
});

const db = drizzle(pool);

export default db;
