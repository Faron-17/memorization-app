import React from 'react'
import Link from 'next/link'

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Category } from '@/lib/definitions'
import { Badge } from '@/components/ui/badge'

import { fetchCategories } from '@/lib/actions/root/category/action'

const SidebarCategories = async () => {
  // TODO 型定義要確認
  const categories: Category[] | null = await fetchCategories();
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>カテゴリー</SidebarGroupLabel>
      <SidebarMenu>
        {categories && categories.filter((item: Category) => item.pin).map((item: Category) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link href={'/my-page/' + item.id + '/study-now'} className="flex justify-between">
                <span className="flex items-center">
                  {/* TODO 3点リーダー */}
                  <span className="ml-2">{item.name}</span>
                </span>
                {/* TODO 計算 */}
                <Badge>
                  0
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default SidebarCategories