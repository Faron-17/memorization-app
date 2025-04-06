import React from 'react'
import Link from 'next/link'

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Category } from '@/lib/definitions'
import { Badge } from '@/components/ui/badge'

import { fetchCategories } from '@/lib/actions/root/category/action'


const SidebarCategories = async () => {
  const { categories, total } = await fetchCategories();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>カテゴリー</SidebarGroupLabel>
      <SidebarMenu>
        {categories.map((item: Category) => {
          if(!item.pin) return
          const totalNumber = total.filter((tl) => tl.id === item.id)[0].total
          return (
            <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link href={'/my-page/' + item.id + '/study-now'} className="flex justify-between">
                <span className="flex items-center">
                  {/* TODO 3点リーダー */}
                  <span className="ml-2">{item.name}</span>
                </span>
                <Badge>
                  {totalNumber}
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default SidebarCategories