import React from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import BrowseCardFooter from '@/components/BrowseCardFooter';

import { Item } from '@/lib/definitions'

const ItemsListForSmallView = ({ item }: {item: Item}) => {
  return (
    <div className="hidden max-sm:block">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeSanitize]}
            >
              {item.title}
            </ReactMarkdown>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100%-2rem)] h-fit overflow-y-scroll flex flex-col justify-center pt-24 px-2.5">
          <DialogHeader>
            <DialogTitle className='text-left'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeSanitize]}
              >
              {item.title}
              </ReactMarkdown>
            </DialogTitle>
          </DialogHeader>
          <div className='text-sm mark-down'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeSanitize]}
            >
            {item.answer}
            </ReactMarkdown>
          </div>
          <DialogFooter>
            <BrowseCardFooter categoryId={item.category_id} data={[item]} order={0} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ItemsListForSmallView