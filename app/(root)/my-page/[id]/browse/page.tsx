import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import BrowseSection from '@/components/BrowseSection'
import NoMemoItem from '@/components/NoMemoItem'

import { fetchItems } from '@/lib/actions/root/item/action'
import { fetchCategory } from '@/lib/actions/root/category/action'

export const metadata: Metadata = {
  title: '参照',
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { data } = await fetchCategory({id})

  if(data === null || data.length === 0) {
    notFound()
  }

  const { items } = await fetchItems({id})

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      { items.length === 0 ? 
        <NoMemoItem id={id} />
      :
        <BrowseSection items={items} categoryId={id}/>
      }
    </>
  )
}

export default page