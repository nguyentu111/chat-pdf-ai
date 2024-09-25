import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  out: "drizzle",
  dialect: "mysql",
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

// npx drizzle-kit generate:pg
// npx drizzle-kit push:pg
