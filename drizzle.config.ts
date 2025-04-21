import { defineConfig } from 'drizzle-kit';

const DATABASE_URL = 'postgresql://postgres:p8mJl1QD7oFgDSKk@db.ljtpgcmhznftngtzztty.supabase.co:5432/postgres';

export default defineConfig({
  out: './drizzle',
  schema: './shared/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
