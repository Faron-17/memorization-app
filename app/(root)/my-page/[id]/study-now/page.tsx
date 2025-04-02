import React from 'react'

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import MemoSection from '@/components/MemoSection'

// デモデータ
import { fetchItems } from '@/lib/actions/root/item/action'
import { Item } from '@/lib/definitions'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  // TODO null対応
  const items : Item[] | null = await fetchItems({category_id : id})

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      {items && items.length > 0 ? <MemoSection items={items} /> :
        <div className='flex flex-col justify-center items-center h-full mb-12'>
          <p>暗記するものがないです。作成をしましょう。</p>
          <Link href={`/my-page/${id}/create`} className='mt-6 cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
            <Plus width={16} height={16}/>
            <span className='ml-2 text-sm font-medium'>暗記アイテム作成</span>
          </Link>
        </div>
      }
    </>
  )
}

export default page