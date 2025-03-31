import React from 'react'

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import CreateEditSection from '@/components/CreateEditSection'

// デモデータ
import { items } from '@/constants/placeholder-data'
import { Item } from '@/lib/definitions'

const page = async ({ params }: { params: Promise<{ id: string, itemId: string }> }) => {
  const { id, itemId } = await params

  // TODO fetch itemId
  const item = items.filter((el: Item) => el.id === itemId)[0]

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      <CreateEditSection id={id} item={item}/>
    </>
  )
}

export default page