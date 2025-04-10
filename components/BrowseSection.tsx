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
  const queryCreatedAt = searchParams.get('updatedAt')
  const queryCount = searchParams.get('count')
  const data = 
    queryCreatedAt === 'asc' ? items.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()) : 
    queryCreatedAt === 'desc' ? items.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()) :
    queryCount === 'asc' ? items.sort((a, b) => a.count - b.count) : 
    queryCount === 'desc' ? items.sort((a, b) => b.count - a.count) : items.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  return (
    <section className='grid grid-cols-3 gap-6 px-4 pb-4 max-sm:flex'>
      <div className='h-[calc(100vh-10rem)] overflow-y-scroll overflow-x-hidden'>
        <ul className='flex flex-col space-y-2 col-span-1 w-full'>
          {data.map((item: Item, index: number) => (
            <li key={index} className=''>
              <Button variant='ghost' onClick={() => setOrder(index)} className={cn('w-full cursor-pointer flex justify-start max-sm:hidden', order === index ? 'bg-gray-100' : '')}>
                <span className='overflow-hidden text-clip mark-down'>
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
      </div>
      <Card className='w-full h-full col-span-2 max-sm:hidden'>
        <CardHeader>
          <CardTitle className='flex items-center mark-down'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeSanitize]}
            >
              {data[order] ? data[order].title : data[0].title}
            </ReactMarkdown>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col justify-between h-full'>
          <div className='flex flex-col mark-down'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeSanitize]}
            >
              {data[order] ? data[order].answer : data[0].answer}
            </ReactMarkdown>
          </div>
          <BrowseCardFooter categoryId={categoryId} data={data} order={order} />
        </CardContent>
      </Card>
    </section>
  )
}

export default BrowseSection