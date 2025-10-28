import express, { json } from "express";
import orgRouter from "./routers/org.route.js";
import userRouter from "./routers/user.route.js";
import cors from 'cors'

import { sql } from "drizzle-orm";
import db from "../db/index.js";

(async () => {
  try {
    const result = await db.execute(
      sql`SELECT current_database(), current_user;`
    );
    console.log("✅ Connected to DB:", result);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

const app = express();
app.use(cors());
app.use(json());
app.use("/org", orgRouter);
app.use("/user", userRouter);
app.listen(3010, () => {
    console.log("server is up and running");
})