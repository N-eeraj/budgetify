import { drizzle } from 'drizzle-orm/neon-http';

console.log(process.env.DATABASE_URL)
if (!process.env.DATABASE_URL) throw new Error("Missing env variable: DATABASE_URL")

export const db = drizzle(process.env.DATABASE_URL);
