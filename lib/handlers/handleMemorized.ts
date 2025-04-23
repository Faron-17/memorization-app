import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner'

import { memorizedItem  } from '@/lib/actions/root/item/action'
import { Item } from '@/lib/definitions';

interface Props {
  memorizedItems: Pick<Item, "id" | "count">[],
  router: AppRouterInstance,
}

export const handleMemorized = async ({ memorizedItems, router }: Props) => {
  if(memorizedItems.length === 0) {
    router.push('./done')
    router.refresh()
  }

  const isSuccesses = await memorizedItem({memorizedItems})
  if(isSuccesses) {
    router.push('./done')
    router.refresh()
  } else {
    toast('エラー')
  }
}