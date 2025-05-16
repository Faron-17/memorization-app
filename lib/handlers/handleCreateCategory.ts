import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner'
import { Category } from '@/lib/definitions';
import { createCategory } from '@/lib/actions/root/category/action';
import { supabase } from "@/lib/supabase/client"

interface Props {
  item: Pick<Category, 'name' | 'pin'>,
  router: AppRouterInstance,
}

export const handleCreateCategory = async ({item, router}: Props) => {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if(userError || userData === null) {
    toast(`エラー`)
    return
  }

  const { error } = await createCategory({item: Object.assign(item, {"user_id": userData.user.id })})

  if(error) {
    toast(`エラー`)
  } else {
    toast(`${item.name}を作成しました`)
    router.refresh()
  }
}