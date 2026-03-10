import { Pool } from "pg";
import { serverEnv } from "@/lib/env/server-env";

declare global {
  var __elementalGardenPool: Pool | undefined;
}

export const db =
  global.__elementalGardenPool ??
  new Pool({
    connectionString: serverEnv.DATABASE_URL,
    max: serverEnv.NODE_ENV === "production" ? 20 : 5,
    ssl: { rejectUnauthorized: false },
  });

if (serverEnv.NODE_ENV !== "production") {
  global.__elementalGardenPool = db;
}
