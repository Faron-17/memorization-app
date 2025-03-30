'use client'

import { ArrowUpDown, BookOpen, Hourglass, ListTree, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const ItemHeader = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pageType = pathname.split('/').pop()

  {/* TODO ソート/toast */}
  const onHandleSort = (sortType: string) => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    })
    console.log(sortType)
  }

  return (
    <div className="w-full flex justify-between py-4 px-4.5">
      <div className='flex space-x-4'>
        {/* TODO 作成・編集画面からの遷移はアラートを出す */}
        <Link href={`/my-page/${id}/study-now`} className={cn('cursor-pointer flex items-center justify-center hover:bg-gray-100 px-3 py-2 rounded-lg', pageType === 'study-now' && 'bg-gray-200')}>
          <BookOpen width={16} height={16}/>
          <span className='ml-2 text-sm font-medium'>暗記</span>
        </Link>
        {/* TODO 作成・編集画面からの遷移はアラートを出す */}
        <Link href={`/my-page/${id}/browse`} className={cn('cursor-pointer flex items-center justify-center hover:bg-gray-100 px-3 py-2 rounded-lg', pageType === 'browse' && 'bg-gray-200')}>
          <ListTree width={16} height={16}/>
          <span className='ml-2 text-sm font-medium'>参照</span>
        </Link>
        { pageType === 'browse' && 
          <div className='flex items-end space-x-2'>
            <Button
              className='cursor-pointer h-6 px-3 py-1 text-sm'
              variant="ghost"
              onClick={() => onHandleSort('sort1')}
            >
              <Hourglass /><span>ソート1</span>
            </Button>
            <Button
              className='cursor-pointer h-6 px-3 py-1 text-sm'
              variant="ghost"
              onClick={() => onHandleSort('sort2')}
            >
              <ArrowUpDown /><span>ソート2</span>
            </Button>
          </div>
        }
      </div>
      { pageType === 'browse' && 
      <div className='flex'>
        <Link href={`/my-page/${id}/create`} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
          <Plus width={16} height={16}/>
          <span className='ml-2 text-sm font-medium'>暗記アイテム作成</span>
        </Link>
      </div>
      }
    </div>
  )
}

export default ItemHeader