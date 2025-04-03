import React from 'react'
import { notFound } from 'next/navigation'

import { fetchCategory } from '@/lib/actions/root/category/action'

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'
import CreateEditSection from '@/components/CreateEditSection'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { data } = await fetchCategory({id})

  if(data === null || data.length === 0) {
    notFound()
  }

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
      <CreateEditSection id={id} />
    </>
  )
}

export default page