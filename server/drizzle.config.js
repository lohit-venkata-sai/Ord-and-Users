import { defineConfig } from "drizzle-kit"


export default config = defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./drizzle/schema.js",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});

