import { drizzle } from 'drizzle-orm/node-postgres'
import "dotenv/config";
// postgres://<username>:<password>@<host>:<port>/<db_name>
console.log(process.env.POSTGRES_URL);
const db = drizzle(process.env.POSTGRES_URL); 

export default db;