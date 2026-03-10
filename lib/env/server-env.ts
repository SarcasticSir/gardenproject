import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  OPENWEATHER_API_KEY: z.string().min(1),
  OPENWEATHER_DEFAULT_CITY: z.string().default("Oslo"),
  OPENWEATHER_DEFAULT_COUNTRY: z.string().default("NO"),
});

export const serverEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  OPENWEATHER_DEFAULT_CITY: process.env.OPENWEATHER_DEFAULT_CITY,
  OPENWEATHER_DEFAULT_COUNTRY: process.env.OPENWEATHER_DEFAULT_COUNTRY,
});
