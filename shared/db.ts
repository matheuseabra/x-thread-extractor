import { drizzle } from "drizzle-orm/postgres-js";

const DATABASE_URL = 'postgresql://postgres:p8mJl1QD7oFgDSKk@db.ljtpgcmhznftngtzztty.supabase.co:5432/postgres';

const db = drizzle(DATABASE_URL);

export { db };
