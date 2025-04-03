import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NoMemoItem = ({ id }: { id: string }) => {
  return (
    <div className='flex flex-col justify-center items-center h-full mb-12'>
      <p>暗記するものがないです。作成をしましょう。</p>
      <Link href={`/my-page/${id}/create`} className='mt-6 cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
        <Plus width={16} height={16}/>
        <span className='ml-2 text-sm font-medium'>暗記アイテム作成</span>
      </Link>
    </div>
  )
}

export default NoMemoItem