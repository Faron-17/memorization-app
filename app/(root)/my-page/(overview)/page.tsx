import React from 'react'
import { Metadata } from 'next';
import Link from 'next/link'
import { Category } from '@/lib/definitions'
import { Badge } from '@/components/ui/badge'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { fetchCategories } from '@/lib/actions/root/category/action'
import { DialogComponent } from '@/components/DialogComponent'

export const metadata: Metadata = {
  title: 'マイページ',
};

const page = async () => {
  const { categories, total } = await fetchCategories();
  const data = categories.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

  return (
    <>
      <SidebarTrigger className="-ml-1 m-4 cursor-pointer" />
      <main className="px-24 h-full max-sm:px-6">
        {categories.length === 0 ? 
          <div className='flex flex-col justify-center items-center mt-36'>
            <h2 className='text-3xl font-semibold'>ようこそ、Memorization Appへ</h2>
            <p className='pt-5'>暗記するカテゴリーを追加しましょう</p>
            <p className='pt-2 mb-8'>サイドバーに最大5つまでピン留め可能です。</p>
            <DialogComponent type='create' triggerText='カテゴリー登録' description='新規登録するカテゴリー名を入れてください' isHome={true} />
          </div>
          :
          <div>
            <h2 className='text-2xl font-semibold dark:text-white max-lg:text-lg'>カテゴリー</h2>
            <ul className="flex flex-col space-y-4 mt-4">
              {
                data.map((item: Category) => {
                  const totalNumber = total.filter((tl) => tl.id === item.id)[0].total
                  return (
                  <li key={item.id}>
                    <Link href={'/my-page/' + item.id + '/study-now'} className="flex justify-between gap-2 rounded-lg border p-3 text-left text-md transition-all hover:bg-accent cursor-pointer w-full h-12 border-slate-500">
                      <span>{item.name}</span>
                      <Badge>
                        {totalNumber}
                      </Badge>
                    </Link>
                  </li>
                )})
              }
            </ul>
          </div>
        }
      </main>
    </>
  )
}

export default page