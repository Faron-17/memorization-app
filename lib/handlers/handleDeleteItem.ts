import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { deleteItem } from '@/lib/actions/root/item/action'
import { toast } from 'sonner'

export const handleDeleteItem = async (itemId: string, router: AppRouterInstance) => {
  if (!itemId) return;

  const { error } = await deleteItem({ itemId });

  if (error) {
    toast('エラー');
  } else {
    toast('削除しました');
    router.refresh();
  }
}