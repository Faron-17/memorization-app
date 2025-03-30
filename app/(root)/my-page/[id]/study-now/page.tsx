import React from 'react'

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import MemoSection from '@/components/MemoSection'

// デモデータ
import { items } from '@/constants/placeholder-data'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  
  {/* TODO fetch data by id */}

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      <MemoSection items={items} />
    </>
  )
}

export default page