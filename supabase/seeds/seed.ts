import { createSeedClient } from '@snaplet/seed'
import { categoryData } from '@/supabase/seeds/data'

async function main() {
  const seed = await createSeedClient({ dryRun: true })

  await seed.categories(categoryData)

  process.exit()
}

main()

