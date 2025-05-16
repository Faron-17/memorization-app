import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner'

import { memorizedItem  } from '@/lib/actions/root/item/action'
import { Item } from '@/lib/definitions';
import { LINKS } from '@/constants';

interface Props {
  memorizedItems: Pick<Item, "id" | "count">[],
  router: AppRouterInstance,
  id: string,
}

export const handleMemorized = async ({ memorizedItems, router, id }: Props) => {
  if(memorizedItems.length === 0) {
    router.push(LINKS.done(id))
    router.refresh()
  }

  const isSuccesses = await memorizedItem({memorizedItems})
  if(isSuccesses) {
    router.push(LINKS.done(id))
    router.refresh()
  } else {
    toast('エラー')
  }
}