import React, { Suspense } from 'react'
import Link from 'next/link'
import { Undo2 } from 'lucide-react'
import { Metadata } from 'next'

import { Skeleton } from '@/components/ui/skeleton'
import ConfettiComponent from '@/components/ConfettiComponent'
import CategoryHeader from '@/components/CategoryHeader'
import { LINKS } from '@/constants'

export const metadata: Metadata = {
  title: '達成',
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <div>
      <CategoryHeader id={id} />
      <div className='h-full flex flex-col justify-center items-center mt-[15%]'>
        <Suspense fallback={<Skeleton className='w-full h-full' />}>
          <ConfettiComponent />
        </Suspense>
        <p className='text-3xl font-bold'>暗記達成！</p>
        <Link href={LINKS.browse(id)} className='flex justify-center items-center mt-5 hover:bg-accent px-5 py-2.5 rounded-md'>
          <Undo2 />
          <span className='ml-3'>参照ページに戻る</span>
        </Link>
      </div>
    </div>
  )
}

export default page