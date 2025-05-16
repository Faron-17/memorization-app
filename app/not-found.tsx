import { Undo2 } from 'lucide-react'
import Link from 'next/link'

import { LINKS } from '@/constants'
 
export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center my-[25%]'>
      <h2>ページが見つかりません</h2>
      <Link href={LINKS.mypage} className='flex justify-center items-center mt-5 hover:bg-accent px-5 py-2.5 rounded-md'>
        <Undo2 />
        <span className='ml-3'>マイページに戻る</span>
      </Link>
    </div>
  )
}