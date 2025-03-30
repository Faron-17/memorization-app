import { BookOpen, ListTree, PenLine, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ItemHeader = ({ id, type }: { id: string, type?: string }) => {
  return (
    <div className="w-full flex justify-between py-4 px-4.5">
      <div className='flex space-x-4'>
        {/* TODO 作成・編集画面からの遷移はアラートを出す */}
        <Link href={`/my-page/${id}/study-now`} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
          <BookOpen width={16} height={16}/>
          <span className='ml-2 text-sm font-medium'>暗記</span>
        </Link>
        {/* TODO 作成・編集画面からの遷移はアラートを出す */}
        <Link href={`/my-page/${id}/browse`} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
          <ListTree width={16} height={16}/>
          <span className='ml-2 text-sm font-medium'>参照</span>
        </Link>
      </div>
      { type === 'browse' && 
      <div className='flex'>
        <Link href={`/my-page/${id}/create`} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
          <Plus width={16} height={16}/>
          <span className='ml-2 text-sm font-medium'>暗記アイテム作成</span>
        </Link>
        <Link href={`/my-page/${id}/edit`} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
          <PenLine width={16} height={16}/>
          <span className='ml-2 text-sm font-medium'>暗記アイテム編集</span>
        </Link>
        {/* TODO 削除 */}
      </div>
      }
    </div>
  )
}

export default ItemHeader