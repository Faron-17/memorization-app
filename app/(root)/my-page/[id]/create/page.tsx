import React from 'react'

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import CreateEditSection from '@/components/CreateEditSection'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      <CreateEditSection id={id} />
    </>
  )
}

export default page