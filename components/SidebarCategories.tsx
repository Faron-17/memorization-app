"use client"

import React from 'react'
import Link from 'next/link'

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { DialogComponent } from '@/components/DialogComponent'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Category } from '@/lib/definitions'
import { LINKS } from '@/constants'
interface Props {
  categories: Category[],
  total: {
    id: string;
    total: number;
  }[],
  pinnedCategoriesCount: number
}

const SidebarCategories = ({categories, total, pinnedCategoriesCount}: Props) => {
  const { setOpenMobile } = useSidebar();
  const data = categories.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>カテゴリー</SidebarGroupLabel>
        <SidebarMenu>
          {data.map((item: Category) => {
            if(!item.pin) return
            const totalNumber = total.filter((tl) => tl.id === item.id)[0].total
            return (
              <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link href={LINKS.studynow(item.id)} className="flex justify-between" onClick={() => setOpenMobile(false)}>
                  <span className="flex items-center">
                    <span className="ml-2">{item.name}</span>
                  </span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Badge>
                        {totalNumber}
                      </Badge>
                    </HoverCardTrigger> 
                    <HoverCardContent className="py-2">
                      <p className='text-sm'>今日覚える暗記アイテムは{totalNumber}件です</p>
                    </HoverCardContent>
                  </HoverCard>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroup>
      <DialogComponent type='create' triggerText='カテゴリー登録' description='新規登録するカテゴリー名を入れてください' pinnedCount={pinnedCategoriesCount} />
    </>
  )
}

export default SidebarCategories