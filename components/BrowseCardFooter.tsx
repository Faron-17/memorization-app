import React from 'react'
import { PenLine } from 'lucide-react';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import AlertComponent from '@/components/AlertComponent';

import { Item } from '@/lib/definitions';
import { LINKS } from '@/constants';

dayjs.extend(utc);
dayjs.extend(timezone);

const BrowseCardFooter = ({categoryId, data}: {categoryId: string, data: Item}) => {
  const updated_at = dayjs(data.updated_at).add(9, 'hour').format('YYYY/MM/DD HH:mm')

  return (
    <div className='flex justify-between'>
      <div className='flex text-sm items-center space-x-2'>
        <p>回数: {data.count}回</p>
        <p className='self-center'>更新日: {updated_at}</p>
      </div>
      <div className='flex'>
        <Link href={LINKS.edit({categoryId: categoryId, itemId: data.id})} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
          <PenLine width={16} height={16}/>
          <span className='ml-2 text-sm font-medium max-lg:hidden'>暗記アイテム編集</span>
        </Link>
        <AlertComponent triggerText='暗記アイテム削除' title='暗記アイテム削除' description={`本当に「${data.title}」を削除しますか？`} itemId={data.id} />
      </div>
    </div>
  )
}

export default BrowseCardFooter