import React, { Suspense } from 'react'
import Link from 'next/link'
import { Undo2 } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import ConfettiComponent from '@/components/ConfettiComponent'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <Suspense fallback={<Skeleton className='w-full h-full'/>}>
        <ConfettiComponent />
      </Suspense>
      <p className='text-3xl font-bold'>You Done!</p>
      <Link href={`/my-page/${id}/browse`} className='flex justify-center items-center mt-5 hover:bg-slate-100 px-5 py-2.5 rounded-md'>
        <Undo2 />
        <span className='ml-3'>Back to Home</span>
      </Link>
    </div>
  )
}

export default page