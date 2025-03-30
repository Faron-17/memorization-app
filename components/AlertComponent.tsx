'use client'

import React from 'react'
import { Plus } from 'lucide-react'

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
import { Input } from '@/components/ui/input'

interface Props {
  triggerText: string,
  title: string,
  description: string,
  defaultData: string,
  id: string
}

const AlertComponent = ({triggerText, title, description, defaultData, id}: Props) => {
  // TODO DB登録・更新
  return (
    <AlertDialog>
      <AlertDialogTrigger className='cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100 rounded-lg'>
        <Plus width={16} height={16}/>
        <span className="ml-2 text-sm font-medium">{triggerText}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <Input value={defaultData} />
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>キャンセル</AlertDialogCancel>
          <AlertDialogAction className='cursor-pointer'>続ける</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertComponent