import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createItem  } from '@/lib/actions/root/item/action'
import { toast } from 'sonner'
import { Item } from '../definitions';

export const handleCreateItem = async ({id, item, router}: { id: string, item: Pick<Item, 'title' | 'answer'>, router: AppRouterInstance }) => {
  const { error } = await createItem({item, id});

  if(!error) {
    toast('暗記アイテムを作成しました。')
    router.push(`/my-page/${id}/browse`)
    router.refresh()
  } else {
    toast('エラー')
  }
}