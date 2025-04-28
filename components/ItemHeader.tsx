'use client'

import { ArrowUpDown, BookOpen, Hourglass, ListTree, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LINKS } from '@/constants'

const ItemHeader = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pageType = pathname.split('/').pop()
  const router = useRouter();
  const searchParams = useSearchParams();

  const onHandleSort = (sortType: 'updatedAt' | 'count') => {
    const value = searchParams.get(sortType)

    const createQuery = (type: 'asc' | 'desc') => new URLSearchParams({ [sortType]: type}).toString()
    const query = value === null || value === 'desc' ? createQuery('asc') : createQuery('desc')

    router.push(`/my-page/${id}/browse?${query}`);
  }

  return (
    <div className="w-full flex justify-between py-4 px-4.5">
      <div className='flex space-x-4'>
        <Link href={LINKS.studynow(id)} className={cn('cursor-pointer flex items-center justify-center hover:bg-gray-100 px-3 py-2 rounded-lg', pageType === 'study-now' && 'bg-gray-200')}>
          <BookOpen width={16} height={16}/>
          <span className='ml-2 text-sm font-medium max-lg:hidden'>暗記</span>
        </Link>
        <Link href={LINKS.browse(id)} className={cn('cursor-pointer flex items-center justify-center hover:bg-gray-100 px-3 py-2 rounded-lg', pageType === 'browse' && 'bg-gray-200')}>
          <ListTree width={16} height={16}/>
          <span className='ml-2 text-sm font-medium max-lg:hidden'>参照</span>
        </Link>
        { pageType === 'browse' && 
          <div className='flex items-end space-x-2'>
            <Button
              className='cursor-pointer h-6 px-3 py-1 text-sm bg-gray-100'
              variant="ghost"
              onClick={() => onHandleSort('updatedAt')}
            >
              <Hourglass /><span className='max-lg:hidden'>更新日時でソート</span>
            </Button>
            <Button
              className='cursor-pointer h-6 px-3 py-1 text-sm bg-gray-100'
              variant="ghost"
              onClick={() => onHandleSort('count')}
            >
              <ArrowUpDown /><span className='max-lg:hidden'>暗記回数でソート</span>
            </Button>
          </div>
        }
      </div>
      { pageType === 'browse' && 
      <div className='flex'>
        <Link href={LINKS.create(id)} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
          <Plus width={16} height={16}/>
          <span className='ml-2 text-sm font-medium max-lg:hidden'>暗記アイテム作成</span>
        </Link>
      </div>
      }
    </div>
  )
}

export default ItemHeader