'use client'

import React, { useEffect, useState } from 'react'
import { Lightbulb, BookOpen, CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { Item } from '@/lib/definitions'
import { memorizedItem } from '@/lib/actions/root/item/action'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import { toast } from 'sonner'

const MemoSection = ({ items, total }: { items: Item[], total: number}) => {
  const [ isDisabled, setIsDisabled ] = useState(false)
  const [ started, setStarted ] = useState(false)
  const [ order, setOrder ] = useState(0);
  const [ isVisibleAnswer, setIsVisibleAnswer ] = useState(false);
  const [ memorizedItems, setMemorizedItems ] = useState<Pick<Item, 'id' | 'count'>[]>([]);
  const router = useRouter()

  useEffect(() => {
    setIsVisibleAnswer(true)
  }, [order]);

  const handleOnClick = async ({ isTerminated, memoType } : { isTerminated: boolean, memoType: "pause" | "done" | "tomorrow" }) => {
    const newItem = { id: items[order].id, count: items[order].count + 1 }

    if(memoType === 'pause') {
      if(memorizedItems.length === 0) router.push('./done')
      await finishMemorizing({data: memorizedItems})
    } else if(memoType === 'done') {
      if(isTerminated) {
        await finishMemorizing({data: memorizedItems})
      } else {
        setOrder(order + 1)
        setMemorizedItems([...memorizedItems, newItem])
      }
    } else if(memoType === 'tomorrow') {
      if(isTerminated) {
        if(memorizedItems.length === 0) router.push('./done')
        await finishMemorizing({data: [...memorizedItems]})
      } else {
        setOrder(order + 1)
        setMemorizedItems([...memorizedItems])
      }
    }
  }

  const finishMemorizing = async ({ data }: { data: Pick<Item, "id" | "count">[] }) => {
    setIsDisabled(true)
    const isSuccesses = await memorizedItem({memorizedItems: data})
    if(isSuccesses) {
      router.push('./done')
    } else {
      setIsDisabled(false)
      toast('エラー')
    }
  }

  const handleOnClickBack = () => {
    setOrder(order-1)
    setMemorizedItems(memorizedItems => memorizedItems.slice(0, memorizedItems.length - 1))
  }

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <div className={cn('flex-col justify-center items-center', started ? 'hidden' : 'flex')}>
        <p className='text-md font-semibold'>{total}件の暗記アイテムがあります。</p>
        <Button className='w-24 cursor-pointer mt-6'onClick={() => setStarted(true)}>暗記開始</Button>
      </div>
      <section className={cn(started ? 'flex flex-col' : 'hidden', 'w-full px-6 h-full')}>
        <Card className='w-full h-full'>
          <CardHeader className='max-sm:px-4'>
            <CardTitle className='flex items-center'>
              <BookOpen width={28} height={28} className='max-sm:hidden' />
              <div className='pl-4 w-full max-sm:pl-0'>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeSanitize]}
                >
                {items[order].title}
                </ReactMarkdown>
              </div> 
            </CardTitle>
          </CardHeader>
          <CardContent className={cn(isVisibleAnswer ? 'hidden' : 'flex max-sm:px-4')}>
            <Lightbulb className='pr-4 w-fit max-sm:hidden' width={28} height={28} />
            <div className='w-full mark-down'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeSanitize]}
              >
              {items[order].answer}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
        <div className='flex justify-between my-6 max-sm:flex-col-reverse'>
          <Button variant='ghost' className='cursor-pointer flex max-sm:mt-3' onClick={() => handleOnClick({memoType: 'pause', isTerminated: true})} disabled={isDisabled}>
            <CircleX />
            中断する
          </Button>
          <div className='flex justify-between max-sm:flex-col w-full sm:ml-3'>
            <Button variant='secondary' className='cursor-pointer' disabled={order === 0 || isDisabled} onClick={() => handleOnClickBack()}>
              戻る
            </Button>
            <Button onClick={() => setIsVisibleAnswer(!isVisibleAnswer)} className='cursor-pointer sm:ml-3 max-sm:mt-3' disabled={isDisabled}>
              {isVisibleAnswer ? '解答を見る' : '解答を隠す'}
            </Button>
            <div className='flex space-x-5 sm:ml-3 max-sm:mt-3 max-sm:justify-between'>
              <Button className='cursor-pointer' onClick={() => handleOnClick({memoType: 'tomorrow', isTerminated: order === items.length - 1})} disabled={isDisabled}>
                明日もう一度見る
              </Button>
              <Button className='cursor-pointer' onClick={() => handleOnClick({memoType: 'done', isTerminated: order === items.length - 1})} disabled={isDisabled}>
                覚えた
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MemoSection