'use client'

import React from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog'

import { handleDeleteItem } from '@/lib/handlers/handleDeleteItem'
import { handleDeleteCategory } from '@/lib/handlers/handleDeleteCategory'
interface Props {
  triggerText: string,
  title?: string,
  description: string,
  defaultData?: string,
  id?: string,
  itemId?: string
}

const AlertComponent = ({triggerText, title, description, id='', itemId=''}: Props) => {
  const router = useRouter();
  const type = id.length > 0 ? 'category' : itemId.length > 0 ? 'item' : '';
  const onSubmit = async () => {
    if(type === 'item') {
      await handleDeleteItem(itemId, router);
    } else if (type === 'category') {
      await handleDeleteCategory(id, router);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100 rounded-lg px-4 max-lg:px-2'>
        <Trash2 width={16} height={16} />
        <span className="ml-2 text-sm font-medium max-lg:hidden">{triggerText}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='cursor-pointer'>キャンセル</AlertDialogCancel>
            <AlertDialogAction className='cursor-pointer' onClick={onSubmit}>続ける</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertComponent