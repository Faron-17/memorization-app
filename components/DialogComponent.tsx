'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { PenLine, Plus } from 'lucide-react'
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"

import { createCategory, updateCategory } from "@/lib/actions/root/category/action"

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
import { supabase } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { MAX_PINED } from "@/constants"

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
  name: z.string().min(2).max(300),
  pin: z.boolean()
})


export function DialogComponent({type, triggerText, name, description, pin, id='', isHome=false, pinnedCount=0}: Props) {
  const [open, setOpen] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(false)
  const router = useRouter();
  const pathname = usePathname();

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
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if(userError || userData === null) {
        setIsDisabled(false)
        toast(`エラー`)
        return
      }

      const { error } = await createCategory({item: Object.assign(item, {"user_id": userData.user.id })})

      if(error) {
        setIsDisabled(false)
        toast(`エラー`)
      } else {
        form.reset()
        setIsDisabled(false)
        setOpen(false)
        toast(`${item.name}を作成しました`)
        router.refresh()
      }

    } else if(type === 'edit') {
      const { error } = await updateCategory({id, item})
      if(error) {
        setIsDisabled(false)
        toast(`エラー`)
      } else {
        form.reset({pin: item.pin, name: item.name})
        setIsDisabled(false)
        setOpen(false)
        toast(`${item.name}を更新しました`)
        router.push(pathname)
        router.refresh()
      }
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={isHome ? "default" : "ghost"} className={cn("cursor-pointer flex justify-center items-center py-2 rounded-lg px-4", !isHome ? 'hover:bg-gray-100': '!pr-5')}>
          {
            type === 'create' ?
            <Plus width={16} height={16} />
            :
            <PenLine width={16} height={16} />
          }
          <span className="ml-2 text-sm font-medium">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-3 w-full">
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
                <FormItem className="mb-3 w-full flex mt-5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={type ==='edit' && pinnedCount === MAX_PINED ? false : pinnedCount >= MAX_PINED}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className={cn(pinnedCount >= MAX_PINED && "text-gray-400")}>
                      サイドバーにピン留め
                    </FormLabel>
                    {
                      type ==='edit' && pinnedCount === MAX_PINED ? "" : pinnedCount >= MAX_PINED && <p className="text-xs mb-3">※ ピン留めできるのは最大{MAX_PINED}件までです</p>
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
