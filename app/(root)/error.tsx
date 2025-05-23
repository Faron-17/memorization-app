'use client'
 
import { Undo2 } from 'lucide-react'
import Link from 'next/link'

import { LINKS } from '@/constants'
 
export default function Error() {
  return (
    <div className='flex flex-col justify-center items-center h-lvh'>
      <h2 className='text-xl'>ページを表示できませんでした</h2>
      <Link href={LINKS.home} className='flex justify-center items-center mt-5 hover:bg-accent px-5 py-2.5 rounded-md'>
        <Undo2 />
        <span className='ml-3'>ログインページに戻る</span>
      </Link>
    </div>
  )
}