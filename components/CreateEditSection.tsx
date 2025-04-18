"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Item } from "@/lib/definitions"
import { createItem, updateItem } from "@/lib/actions/root/item/action"
import { toast } from "sonner"

const formSchema = z.object({
  title: z.string().min(2, { message: "2文字以上で入力してください。" }).max(300, { message: "300文字以内で入力してください。" }),
  answer: z.string().min(2, { message: "2文字以上で入力してください。" }).max(10000, { message: "10000文字以内で入力してください。" }),
})

const CreateEditSection = ({id, itemId, item }: {id: string, itemId?: string, item?: Pick<Item, 'title' | 'answer'>}) => {
  const [ isDisabled, setIsDisabled ] = useState(false)
  const type: 'edit' | 'create' = item ? 'edit': 'create';

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: item ? 
    {
      title: item.title,
      answer: item.answer,
    } as Omit<Item, 'id'>
    :
    {
      title: '',
      answer: '',
    } as Omit<Item, 'id'>
  })
  const title = form.watch("title")
  const answer = form.watch("answer")
 
  const onSubmit = async (item: z.infer<typeof formSchema>) => {
    setIsDisabled(true)
    if(type === 'create') {
      const { error } = await createItem({item, id});

      if(!error) {
        toast('暗記アイテムを作成しました。')
        router.push(`/my-page/${id}/browse`)
        router.refresh()
      } else {
        setIsDisabled(false)
        toast('エラー')
      }
    } else if(type === 'edit') {
      if(itemId === undefined) {
        toast('エラー')
      } else {
        const { error } = await updateItem({title: item.title, answer: item.answer, itemId});
        if(!error) {
          toast('暗記アイテムを編集しました。')
          router.push(`/my-page/${id}/browse`)
        } else {
          setIsDisabled(false)
          console.log(error)
          toast('エラー')
        }
      }
    } 
  }

  return (
    <div className="p-6 pt-0 h-full">
      <ResizablePanelGroup direction="horizontal" className=''>
        <ResizablePanel>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full flex flex-col justify-center items-center">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-3 w-full">
                    <FormControl>
                      <Textarea placeholder="タイトル" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem className="h-full w-full">
                    <FormControl>
                      <Textarea placeholder="解答" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-28 cursor-pointer" disabled={isDisabled}>登録</Button>
            </form>
          </Form>
        </ResizablePanel>
        <ResizableHandle withHandle className='mx-5'/>
        <ResizablePanel className='pb-16'>
          <Card className='h-full py-0'>
            <CardContent className='px-3'>
              <div className='font-medium min-h-8 break-words py-3'>
                {title}
              </div>
              <Separator />
              <div className='py-3 mark-down'>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeSanitize]}
                >
                  {answer}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default CreateEditSection