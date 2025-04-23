import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner'
import { Category } from '@/lib/definitions';
import { updateCategory } from '@/lib/actions/root/category/action';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  id: string,
  item: Pick<Category, 'name' | 'pin'>,
  router: AppRouterInstance,
  form: UseFormReturn<Pick<Category, 'name' | 'pin'>>
}

export const handleEditCategory = async ({id, item, router, form}: Props) => {
  const { error } = await updateCategory({id, item})
  if(error) {
    toast(`エラー`)
  } else {
    form.reset({pin: item.pin, name: item.name})
    toast(`${item.name}を更新しました`)
    router.refresh()
  }
}