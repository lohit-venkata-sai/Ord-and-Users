import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }, // ✅ REQUIRED for Supabase + Render
});

const db = drizzle(pool);

export default db;
