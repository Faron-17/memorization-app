'use client'

import { ArrowUpDown, BookOpen, Hourglass, ListTree, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const ItemHeader = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pageType = pathname.split('/').pop()
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryUpdatedAt = searchParams.get('updatedAt')
  const queryCount = searchParams.get('count')

  const onHandleSort = (sortType: 'updatedAt' | 'count') => {
    const value = sortType === 'updatedAt' ? queryUpdatedAt : queryCount
    let query;
    if(value === null || value === 'desc') {
      query = new URLSearchParams({ [sortType]: 'asc'}).toString();
    } else {
      query = new URLSearchParams({ [sortType]: 'desc'}).toString();
    }
    router.push(`/my-page/${id}/browse?${query}`);
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
              onClick={() => onHandleSort('updatedAt')}
            >
              <Hourglass /><span className='max-lg:hidden'>更新日時でソート</span>
            </Button>
            <Button
              className='cursor-pointer h-6 px-3 py-1 text-sm'
              variant="ghost"
              onClick={() => onHandleSort('count')}
            >
              <ArrowUpDown /><span>暗記回数でソート</span>
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