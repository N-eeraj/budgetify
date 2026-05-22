import { Config, defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('Missing env variable: DATABASE_URL');

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas/index.drizzle.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
}satisfies Config);
