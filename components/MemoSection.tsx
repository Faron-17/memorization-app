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

  const handleOnClick = async ({ isTerminated = false, isTomorrow = false } : { isTerminated?: boolean, isTomorrow?: boolean }) => {
    if(isTomorrow) {
      setOrder(order + 1)
    } else {
      const newItems = [...memorizedItems, { id: items[order].id, count: items[order].count + 1 }]

      setMemorizedItems(newItems)
      if(isTerminated || order === items.length - 1) {
        setIsDisabled(true)
        const isSuccesses = await memorizedItem({memorizedItems: newItems})
        if(isSuccesses) {
          setIsDisabled(false)
          router.push('./done')
        } else {
          setIsDisabled(false)
          toast('エラー')
        }
      }
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
          <CardHeader>
            <CardTitle className='flex items-center'>
              <BookOpen width={30} height={30} />
              <p className='pl-4 w-full'>{items[order].title}</p> 
            </CardTitle>
          </CardHeader>
          <CardContent className={cn(isVisibleAnswer ? 'hidden' : 'flex')}>
            <Lightbulb className='pr-4' width={42} height={42} />
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
        <div className='flex justify-between my-6'>
          <Button className='cursor-pointer' disabled={order === 0 || isDisabled} onClick={() => handleOnClickBack()}>
            戻る
          </Button>
          <Button onClick={() => setIsVisibleAnswer(!isVisibleAnswer)} className='cursor-pointer' disabled={isDisabled}>
            {isVisibleAnswer ? '解答を見る' : '解答を隠す'}
          </Button>
          <div className="flex space-x-3">
            <Button className='cursor-pointer' onClick={() => handleOnClick({isTomorrow: true})} disabled={isDisabled}>
              明日もう一度見る
            </Button>
            <Button className='cursor-pointer' onClick={() => handleOnClick({})} disabled={isDisabled}>
              覚えた
            </Button>
            <Button variant='ghost' className='cursor-pointer flex' onClick={() => handleOnClick({isTerminated: true})} disabled={isDisabled}>
              <CircleX />
              中断する
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MemoSection