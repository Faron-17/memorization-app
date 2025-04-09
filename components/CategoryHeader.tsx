import React from 'react'

import { SidebarTrigger } from '@/components/ui/sidebar'
import AlertComponent from '@/components/AlertComponent'
import { Category } from '@/lib/definitions';
import { fetchCategories } from '@/lib/actions/root/category/action';
import { Badge } from '@/components/ui/badge';
import { DialogComponent } from '@/components/DialogComponent';


const CategoryHeader = async ({id}: {id: string}) => {
  const { categories, total, pinnedCategoriesCount } = await fetchCategories();
  const category = categories.filter((item: Category) => item.id === id)[0]
  const totalNumber = total.filter((tl) => tl.id === id)[0].total
  return (
    <div className='flex h-16 shrink-0 items-center border-b px-4 justify-between'>
      <div className='flex gap-2 items-center'>
        <SidebarTrigger className="cursor-pointer" />
        <h2 className='text-2xl font-semibold dark:text-white'>{category.name}</h2>
        <Badge className='mt-1'>
          {totalNumber}
        </Badge>
      </div>
      <div className='flex gap-4'>
        <DialogComponent type='edit' triggerText='カテゴリー名編集' name={category.name} id={id} pin={category.pin} description='編集' pinnedCount={pinnedCategoriesCount} />
        <AlertComponent triggerText='カテゴリー削除' title='カテゴリー削除' description={`本当に「${category.name}」を削除しますか？カテゴリー内の全ての暗記アイテムも消えます。この操作は元に戻せません。`} id={category.id} />      </div>
    </div>
  )
}

export default CategoryHeader