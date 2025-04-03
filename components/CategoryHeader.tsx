import React from 'react'

import { SidebarTrigger } from '@/components/ui/sidebar'
import AlertComponent from '@/components/AlertComponent'
import { Category } from '@/lib/definitions';
import { fetchCategories } from '@/lib/actions/root/category/action';
import { Badge } from '@/components/ui/badge';


const CategoryHeader = async ({id}: {id: string}) => {
  const { categories, total } = await fetchCategories();
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
        <AlertComponent type='edit' triggerText='カテゴリー名編集' title='カテゴリー名編集' description='' defaultData={category.name} id={id} pin={category.pin} />
        <AlertComponent type='delete' triggerText='カテゴリー削除' title='カテゴリー削除' description={`本当に「${category.name}」を削除しますか？カテゴリー内の全ての暗記アイテムも消えます。`} id='' />
      </div>
    </div>
  )
}

export default CategoryHeader