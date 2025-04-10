import React from 'react'
import Link from 'next/link'
import { Undo2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import MemoSection from '@/components/MemoSection'
import NoMemoItem from '@/components/NoMemoItem'

import { fetchItems } from '@/lib/actions/root/item/action'
import { fetchCategory } from '@/lib/actions/root/category/action'
import { measure } from '@/lib/utils'

export const metadata: Metadata = {
  title: '暗記',
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { data } = await fetchCategory({id})

  if(data === null || data.length === 0) {
    notFound()
  }

  const { items, total } = await fetchItems({id})
  const filteredItems = items.filter((item) => measure(item.count, item.memorized_at))

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      { items.length === 0 ? 
          <NoMemoItem id={id} />
        : total === 0 ?
          <div className='flex flex-col justify-center items-center h-full mb-12'>
            <p>暗記するものがないです。</p>
            <Link href={`/my-page/${id}/browse`} className='mt-6 cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
              <Undo2 />
              <span className='ml-2 text-sm font-medium'>暗記アイテム参照</span>
            </Link>
          </div>
        : <MemoSection items={filteredItems} total={total} />
      }
    </>
  )
}

export default page