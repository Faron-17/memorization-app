import React from 'react'
import Link from 'next/link'
import { Plus, Undo2 } from 'lucide-react'

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import MemoSection from '@/components/MemoSection'

import { fetchItems } from '@/lib/actions/root/item/action'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { items, total } = await fetchItems({id})

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      { items.length === 0 ? 
        <div className='flex flex-col justify-center items-center h-full mb-12'>
          <p>暗記するものがないです。作成をしましょう。</p>
          <Link href={`/my-page/${id}/create`} className='mt-6 cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
            <Plus width={16} height={16}/>
            <span className='ml-2 text-sm font-medium'>暗記アイテム作成</span>
          </Link>
        </div>
        : total === 0 ?
          <div className='flex flex-col justify-center items-center h-full mb-12'>
            <p>暗記するものが{total}件です。</p>
            <Link href={`/my-page/${id}/browse`} className='mt-6 cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
              <Undo2 />
              <span className='ml-3'>参照画面へ</span>
            </Link>
          </div>
        : <MemoSection items={items} total={total} />
      }
    </>
  )
}

export default page