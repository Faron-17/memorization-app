import React from 'react'
import { PenLine } from 'lucide-react';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import AlertComponent from '@/components/AlertComponent';

import { Item } from '@/lib/definitions';

dayjs.extend(utc);
dayjs.extend(timezone);

const BrowseCardFooter = ({categoryId, data, order}: {categoryId: string, data: Item[], order: number}) => {
  return (
    <div className='flex justify-between'>
      <div className='flex text-sm items-center space-x-2'>
        <p>回数: {data[order] ? data[order].count : data[0].count}回</p>
        <p className='self-center'>更新日: {data[order] ? dayjs(data[order].updated_at).add(9, 'hour').format('YYYY/MM/DD HH:mm') : dayjs(data[0].updated_at).add(9, 'hour').format('YYYY/MM/DD HH:mm')}</p>
      </div>
      <div className='flex'>
        <Link href={`/my-page/${categoryId}/edit/${data[order] ? data[order].id : data[0].id}/`} className='cursor-pointer flex items-center justify-center hover:bg-slate-100 px-3 py-2 rounded-lg'>
          <PenLine width={16} height={16}/>
          <span className='ml-2 text-sm font-medium max-lg:hidden'>暗記アイテム編集</span>
        </Link>
        <AlertComponent triggerText='暗記アイテム削除' title='暗記アイテム削除' description={`本当に「${data[order] ? data[order].title : data[0].title}」を削除しますか？`} id='' itemId={data[order] ? data[order].id : data[0].id} />
      </div>
    </div>
  )
}

export default BrowseCardFooter