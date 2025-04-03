'use client'

import React, { useState } from 'react'
import { PenLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

import { Item } from '@/lib/definitions'
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

const BrowseSection = ({ items, categoryId }: { items: Item[], categoryId: string }) => {
  const [ order, setOrder ] = useState(0);

  return (
    <section className='grid grid-cols-3 gap-6 h-full px-4 pb-4'>
      <ul className='flex flex-col space-y-2 col-span-1'>
        {items.map((item: Item, index: number) => (
          <li key={index} className=''>
            <Button variant='ghost' onClick={() => setOrder(index)} className={cn('w-full cursor-pointer flex justify-start', order === index ? 'bg-gray-100' : '')}>
              <span className='overflow-hidden text-clip'>
                {item.title}
              </span>
            </Button>
          </li>
        ))}
      </ul>
      <Card className='w-full h-full col-span-2'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeSanitize]}
            >
              {items[order].title}
            </ReactMarkdown>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeSanitize]}
            >
              {items[order].answer}
            </ReactMarkdown>
          </div>
          <div className='flex self-end'>
            <Link href={`/my-page/${categoryId}/edit/${items[order].id}/`} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
              <PenLine width={16} height={16}/>
              <span className='ml-2 text-sm font-medium'>暗記アイテム編集</span>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
                <Trash2 width={16} height={16} />
                <span className='ml-2 text-sm font-medium'>暗記アイテム削除</span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-md font-medium'>削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription className='text-md font-medium'>「{items[order].title}」</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className='cursor-pointer'>キャンセル</AlertDialogCancel>
                  <AlertDialogAction className='cursor-pointer'>削除する</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default BrowseSection