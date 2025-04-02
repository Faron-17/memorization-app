import React from 'react'

import Link from 'next/link'
import { Category } from '@/lib/definitions'
import { Badge } from '@/components/ui/badge'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { fetchCategories } from '@/lib/actions/root/category/action'

const page = async () => {
  const categories = await fetchCategories();

  // TODO バッジ取得
  // const allItems = await fetchAllItems();

  return (
    <>
      <SidebarTrigger className="-ml-1 m-4 cursor-pointer" />
      <main className="px-24 mt-20">
        <h2 className='text-2xl font-semibold dark:text-white'>カテゴリー</h2>
        <ul className="flex flex-col space-y-4 mt-4">
          {
            categories && categories.map((item: Category) => (
              <li key={item.id}>
                <Link href={'/my-page/' + item.id + '/study-now'} className="flex justify-between gap-2 rounded-lg border p-3 text-left text-md transition-all hover:bg-accent cursor-pointer w-full h-12 border-slate-500">
                  {/* TODO 3点リーダー */}
                  <span>{item.name}</span>
                  {/* TODO 計算 */}
                  <Badge>0</Badge>
                </Link>
              </li>
            ))
          }
        </ul>
      </main>
    </>
    
  )
}

export default page