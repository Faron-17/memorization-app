import React from 'react'
import Link from 'next/link'

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Category } from '@/lib/definitions'
import { Badge } from '@/components/ui/badge'

// デモデータ
import { categories } from '@/constants/placeholder-data'

const SidebarCategories = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>カテゴリー</SidebarGroupLabel>
      <SidebarMenu>
        {categories.filter((item: Category) => item.pin).map((item: Category) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link href={'/my-page/' + item.id} className="flex justify-between">
                <span className="flex items-center">
                  {/* TODO 3点リーダー */}
                  <span className="ml-2">{item.name}</span>
                </span>
                {/* TODO 計算 */}
                <Badge>
                  {item.count}
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