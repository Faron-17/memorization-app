import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { deleteCategory } from '@/lib/actions/root/category/action'
import { deleteAllItemsByCategory, fetchItems } from '@/lib/actions/root/item/action'
import { toast } from 'sonner'

export const handleDeleteCategory = async (id: string, router: AppRouterInstance) => {
  if (!id) return;

  const { items } = await fetchItems({ id });

  if(items.length > 0) {
    const { error } = await deleteAllItemsByCategory({ id });

    if (error) {
      toast('エラー');
      return;
    }
  }

  const { error } = await deleteCategory({ id });

  if (error) {
    toast('エラー');
  } else {
    toast('削除しました');
    router.push('/my-page/');
    router.refresh();
  }
}