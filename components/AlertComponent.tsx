'use client'

import React from 'react'
import { PenLine, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
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
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { deleteItem } from '@/lib/actions/root/item/action'

interface Props {
  type: string,
  triggerText: string,
  title: string,
  description: string,
  defaultData?: string,
  id?: string,
  pin?: boolean,
  itemId?: string
}

const AlertComponent = ({type, triggerText, title, description, defaultData='', id='', pin=false, itemId=''}: Props) => {
  const router = useRouter();
  const onSubmit = async () => {
    if(itemId.length > 0) {
      const { error } = await deleteItem({ itemId });
      if(error){
        toast('エラー')
      } else {
        toast('削除しました')
        router.refresh();
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='cursor-pointer flex justify-center items-center py-2 hover:bg-gray-100 rounded-lg px-4'>
        {
          type === 'create' ? <Plus width={16} height={16} /> :
          type === 'edit' ? <PenLine width={16} height={16} /> :
          type === 'delete' ? <Trash2 width={16} height={16} /> : ''
        }
        <span className="ml-2 text-sm font-medium">{triggerText}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {type !== 'delete' && <Input defaultValue={defaultData} />}
        {type !== 'delete' && 
          <div className='flex items-center gap-3'>
            <Checkbox id="pin" />
            <Label
              htmlFor="pin"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              サイドバーにピン留め
            </Label>
          </div>
        }
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>キャンセル</AlertDialogCancel>
          <AlertDialogAction className='cursor-pointer' onClick={onSubmit}>続ける</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertComponent