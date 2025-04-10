import React from 'react'
import { notFound } from 'next/navigation'

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import CreateEditSection from '@/components/CreateEditSection'

import { fetchItem } from '@/lib/actions/root/item/action'
import { fetchCategory } from '@/lib/actions/root/category/action'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '編集',
};

const page = async ({ params }: { params: Promise<{ id: string, itemId: string }> }) => {
  const { id, itemId } = await params
  const { data } = await fetchCategory({id})

  if(data === null || data.length === 0) {
    notFound()
  }

  const { items } = await fetchItem({id: itemId})

  if(items === null || items.length === 0) {
    notFound()
  }

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      <CreateEditSection id={id} itemId={itemId} item={items[0]} />
    </>
  )
}

export default page