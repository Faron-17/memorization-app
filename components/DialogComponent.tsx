'use client'

import { useState } from "react"
import { z } from "zod"
import { PenLine, Plus } from 'lucide-react'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { canPinMore, cn } from "@/lib/utils"
import { MAX_PINED } from "@/constants"
import { handleCreateCategory } from "@/lib/handlers/handleCreateCategory"
import { handleEditCategory } from "@/lib/handlers/handleEditCategory"
import { formSchemaCategory } from "@/lib/validation"
import { useFormCategory } from "@/hooks/use-form-category"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSidebar } from "@/components/ui/sidebar"

interface Props {
  type: 'create' | 'edit',
  triggerText: string,
  name?: string,
  description: string,
  id?: string,
  pin?: boolean,
  isHome?: boolean,
  pinnedCount?: number,
}

export function DialogComponent({type, triggerText, name, description, pin, id='', isHome=false, pinnedCount=0}: Props) {
  const [open, setOpen] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(false)
  const router = useRouter();
  const isMobile = useIsMobile()
  const { setOpenMobile } = useSidebar();

  const form = useFormCategory({type, name, pin})

  const onSubmit = async (item: z.infer<typeof formSchemaCategory>) => {
    setIsDisabled(true)
    form.reset()
    try {
      if(type === 'create') return await handleCreateCategory({item, router})
      if(type === 'edit') return await handleEditCategory({ id, item, router, form })

      return
    } finally {
      setIsDisabled(false)
      setOpen(false)
      if(isMobile) setOpenMobile(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={isHome ? "default" : "ghost"} className={cn("cursor-pointer flex justify-center items-center py-2 rounded-lg px-4 max-md:!px-3", !isHome ? 'hover:bg-gray-100': '!pr-5')}>
          {
            type === 'create' ?
            <Plus width={16} height={16} />
            :
            <PenLine width={16} height={16} />
          }
          <span className="ml-2 text-sm font-medium max-md:hidden">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{triggerText}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="カテゴリー名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="w-full flex mt-1 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!canPinMore({type, pin, pinnedCount})}
                      className={cn(canPinMore({type, pin, pinnedCount}) ? "border-gray-600 cursor-pointer" : "text-gray-400")}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className={cn(canPinMore({type, pin, pinnedCount}) ? "cursor-pointer" : "text-gray-400")}>
                      サイドバーにピン留め
                    </FormLabel>
                    {
                      canPinMore({type, pin, pinnedCount}) ? "" : <p className="text-xs">※ ピン留めできるのは最大{MAX_PINED}件までです</p>
                    }
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-28 cursor-pointer" disabled={isDisabled}>登録</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
