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
import { handleCreateItem } from "@/lib/handlers/handleCreateItem"
import { handleEditItem } from "@/lib/handlers/handleEditItem"
import { ERROR_MESSAGE } from "@/constants"

const formSchema = z.object({
  title: z.string().min(2, { message: ERROR_MESSAGE.min(2)}).max(300, { message: ERROR_MESSAGE.max(300) }),
  answer: z.string().min(2, { message: ERROR_MESSAGE.min(2) }).max(10000, { message: ERROR_MESSAGE.max(10000) }),
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
    }
    :
    {
      title: '',
      answer: '',
    }
  })
  const title = form.watch("title")
  const answer = form.watch("answer")
 
  const onSubmit = async (item: z.infer<typeof formSchema>) => {
    setIsDisabled(true)

    try {
      if(type === 'create') return await handleCreateItem({ id, item, router })
      if(type === 'edit') return await handleEditItem({ id, itemId, item, router })

      return
    } catch {
      setIsDisabled(false)
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