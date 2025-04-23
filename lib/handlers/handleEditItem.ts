import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { updateItem  } from '@/lib/actions/root/item/action'
import { toast } from 'sonner'
import { Item } from '../definitions';

export const handleEditItem = async ({id, itemId, item, router}: { id: string, itemId: string | undefined, item: Pick<Item, 'title' | 'answer'>, router: AppRouterInstance }) => {
  if(itemId === undefined) {
    toast('エラー')
  } else {
    const { error } = await updateItem({title: item.title, answer: item.answer, itemId});
    if(!error) {
      toast('暗記アイテムを編集しました。')
      router.push(`/my-page/${id}/browse`)
    } else {
      console.log(error)
      toast('エラー')
    }
  }
}