'use client'

import React from 'react'
import { Trash2 } from 'lucide-react'
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

import { deleteAllItemsByCategory, deleteItem, fetchItems } from '@/lib/actions/root/item/action'
import { deleteCategory } from '@/lib/actions/root/category/action'
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
  const onSubmit = async () => {
    if(itemId.length > 0) {
      const { error } = await deleteItem({ itemId });
      if(error){
        toast('エラー')
      } else {
        toast('削除しました')
        router.push(`/my-page/`)
        router.refresh()
      }
    }
    if(id.length > 0) {
      const { items } = await fetchItems({id})
      if(items.length === 0) {
        const { categoryError } = await deleteCategory({ id });
        if(categoryError){
          toast('エラー')
        } else {
          toast('削除しました')
          router.push(`/my-page/`)
          router.refresh()
        }
      } else if(items.length > 0) {
        const { error } = await deleteAllItemsByCategory({ id })

        if(error) {
          toast('エラー')
          return
        }

        const { categoryError } = await deleteCategory({ id })

        if(categoryError){
          toast('エラー')
        } else {
          toast('削除しました')
          router.push(`/my-page/`)
          router.refresh()
        }
      }
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