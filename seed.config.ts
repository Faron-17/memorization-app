import { SeedPostgres } from "@snaplet/seed/adapter-postgres";
import { defineConfig } from "@snaplet/seed/config";
import postgres from "postgres";

export default defineConfig({
  adapter: () => {
    const client = postgres(process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL!);
    return new SeedPostgres(client);
  },
});