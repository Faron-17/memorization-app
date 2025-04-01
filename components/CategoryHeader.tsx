import React from 'react'

import { SidebarTrigger } from '@/components/ui/sidebar'
import AlertComponent from '@/components/AlertComponent'
import { Category } from '@/lib/definitions';
import { fetchCategories } from '@/lib/actions/root/category/action';


const CategoryHeader = async ({id}: {id: string}) => {
  // TODO 型定義要確認
  const categories: Category[] | null = await fetchCategories();
  const category = categories ? categories.filter((item: Category) => item.id === id)[0]
                    : {
                      id: '',
                      name: '',
                      pin: false,
                      created_at: new Date,
                      updated_at: new Date,
                    }

  return (
    <div className='flex h-16 shrink-0 items-center border-b px-4 justify-between'>
      <div className='flex gap-2 items-center'>
        <SidebarTrigger className="cursor-pointer" />
        <h2 className='text-2xl font-semibold dark:text-white'>{category.name}</h2>
      </div>
      <div className='flex gap-4'>
        <AlertComponent type='edit' triggerText='カテゴリー名編集' title='カテゴリー名編集' description='' defaultData={category.name} id={id} pin={category.pin} />
        <AlertComponent type='delete' triggerText='カテゴリー削除' title='カテゴリー削除' description={`本当に「${category.name}」を削除しますか？カテゴリー内の全ての暗記アイテムも消えます。`} id='' />
      </div>
    </div>
  )
}

export default CategoryHeader