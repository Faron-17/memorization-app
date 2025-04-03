'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { Item } from '@/lib/definitions'
import { Lightbulb, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'

const MemoSection = ({ items, total }: { items: Item[], total: number}) => {
  const [ started, setStarted ] = useState(false)
  const [ order, setOrder ] = useState(0);
  const [ isVisibleAnswer, setIsVisibleAnswer ] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setIsVisibleAnswer(true)
  }, [order]);

  const handleOnClick = () => {
    // TODO 解答の種類を保存して、DB更新
    if(order === items.length - 1) {
      router.push('./done')
    } else {
      setOrder(order + 1)
    }
  }

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-md font-semibold'>{total}件の暗記アイテムがあります。</p>
        <Button className={cn('w-24 cursor-pointer mt-6', started ? 'hidden' : 'block')} onClick={() => setStarted(true)}>暗記開始</Button>
      </div>
      <section className={cn(started ? 'flex flex-col' : 'hidden', 'w-full px-6 h-full')}>
        <Card className='w-full h-full'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <BookOpen />
              <p className='pl-4'>{items[order].title}</p> 
            </CardTitle>
          </CardHeader>
          <CardContent className={cn(isVisibleAnswer ? 'hidden' : 'flex')}>
            <Lightbulb />
            <p className='pl-4'>{items[order].answer}</p>
          </CardContent>
        </Card>
        <div className='flex justify-between my-6'>
          <Button className='cursor-pointer' disabled={order === 0}  onClick={() => setOrder(order-1)}>
            戻る
          </Button>
          <Button onClick={() => setIsVisibleAnswer(!isVisibleAnswer)} className='cursor-pointer'>
            {isVisibleAnswer ? '解答を見る' : '解答を隠す'}
          </Button>
          <div className="flex space-x-3">
            <Button className='cursor-pointer' onClick={() => handleOnClick()}>
              明日もう一度見る
            </Button>
            <Button className='cursor-pointer' onClick={() => handleOnClick()}>
              覚えた
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MemoSection