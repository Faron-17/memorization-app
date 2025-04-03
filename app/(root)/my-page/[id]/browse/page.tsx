import React from 'react'

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import BrowseSection from '@/components/BrowseSection'
import { fetchItems } from '@/lib/actions/root/item/action'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { items } = await fetchItems({id})

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      <BrowseSection items={items} categoryId={id}/>
    </>
  )
}

export default page