'use client'

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { useSearchParams } from 'next/navigation';

import { Item } from '@/lib/definitions'
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ItemsListForSmallView from '@/components/ItemsListForSmallView';
import BrowseCardFooter from '@/components/BrowseCardFooter';

const BrowseSection = ({ items, categoryId }: { items: Item[], categoryId: string }) => {
  const [ order, setOrder ] = useState(0);
  const searchParams = useSearchParams();
  const queryCreatedAt = searchParams.get('createdAt')
  const queryCount = searchParams.get('count')
  const data = 
    queryCreatedAt === 'asc' ? items.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) : 
    queryCreatedAt === 'desc' ? items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) :
    queryCount === 'asc' ? items.sort((a, b) => a.count - b.count) : 
    queryCount === 'desc' ? items.sort((a, b) => b.count - a.count) : items;

  return (
    <section className='grid grid-cols-3 gap-6 px-4 pb-4'>
      <ScrollArea className="h-[calc(100vh-10rem)] w-full rounded-md border">
        <ul className='flex flex-col space-y-2 col-span-1'>
          {data.map((item: Item, index: number) => (
            <li key={index} className=''>
              <Button variant='ghost' onClick={() => setOrder(index)} className={cn('w-full cursor-pointer flex justify-start', order === index ? 'bg-gray-100' : '')}>
                <span className='overflow-hidden text-clip'>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeSanitize]}
                  >
                  {item.title}
                  </ReactMarkdown>
                </span>
              </Button>
              <ItemsListForSmallView item={item}/>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <Card className='w-full h-full col-span-2'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeSanitize]}
            >
              {data[order] ? data[order].title : data[0].title}
            </ReactMarkdown>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeSanitize]}
            >
              {data[order] ? data[order].answer : data[0].answer}
            </ReactMarkdown>
          </div>
          <div className='flex self-end'>
            <Link href={`/my-page/${categoryId}/edit/${data[order] ? data[order].id : data[0].id}/`} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
              <PenLine width={16} height={16}/>
              <span className='ml-2 text-sm font-medium'>暗記アイテム編集</span>
            </Link>
            <AlertComponent triggerText='暗記アイテム削除' title='暗記アイテム削除' description={`本当に「${data[order] ? data[order].title : data[0].title}」を削除しますか？`} id='' itemId={data[order] ? data[order].id : data[0].id} />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default BrowseSection