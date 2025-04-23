'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { cn } from "@/lib/utils"
import { MAX_PINED } from "@/constants"
import { handleCreateCategory } from "@/lib/handlers/handleCreateCategory"
import { handleEditCategory } from "@/lib/handlers/handleEditCategory"

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

const formSchema = z.object({
  name: z.string().min(2, { message: "2文字以上で入力してください。" }).max(10, { message: "10文字以内で入力してください。" }),
  pin: z.boolean()
})

export function DialogComponent({type, triggerText, name, description, pin, id='', isHome=false, pinnedCount=0}: Props) {
  const [open, setOpen] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(false)
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: type === 'create' ? 
    {
      name: '',
      pin: false,
    }
    :
    {
      name: name,
      pin: pin,
    }
  })

  const onSubmit = async (item: z.infer<typeof formSchema>) => {
    setIsDisabled(true)
    form.reset()
    if(type === 'create') {
      await handleCreateCategory({item, router})
    } else if(type === 'edit') {
      await handleEditCategory({ id, item, router, form })
    }
    setIsDisabled(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={isHome ? "default" : "ghost"} className={cn("cursor-pointer flex justify-center items-center py-2 rounded-lg px-4 max-lg:px-2", !isHome ? 'hover:bg-gray-100': '!pr-5')}>
          {
            type === 'create' ?
            <Plus width={16} height={16} />
            :
            <PenLine width={16} height={16} />
          }
          <span className="ml-2 text-sm font-medium max-lg:hidden">{triggerText}</span>
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
              <FormItem className="w-full flex mt-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={ type ==='edit' && pin ? false : type ==='edit' && pinnedCount < MAX_PINED ? false : pinnedCount >= MAX_PINED}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className={cn(type ==='edit' && pin ? "" : pinnedCount >= MAX_PINED ? "text-gray-400" : "")}>
                    サイドバーにピン留め
                  </FormLabel>
                  {
                    type ==='edit' && pin ? false : type ==='edit' && pinnedCount < MAX_PINED ? "" : pinnedCount >= MAX_PINED && <p className="text-xs mb-3">※ ピン留めできるのは最大{MAX_PINED}件までです</p>
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
