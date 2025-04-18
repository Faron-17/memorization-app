import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar'

import CheckIcon from '@/app/check.png'
import SidebarCategories from '@/components/SidebarCategories'
import SidebarUser from '@/components/SidebarUser'

const SidebarComponent = () => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <Link href='/my-page'>
            <SidebarMenuButton className='cursor-pointer py-6'>
              <div className="flex aspect-square items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <Image src={ CheckIcon } alt='' width={18} height={18} />
              </div>
              <div className="grid flex-1 text-left text-lg leading-tight">
                <span className="truncate font-semibold">Memorization App</span>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='px-2'>
        <SidebarCategories />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  )
}

export default SidebarComponent