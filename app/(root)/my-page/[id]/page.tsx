import React from 'react'

import CategoryHeader from '@/components/CategoryHeader'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <>
      <CategoryHeader id={id} />
    </>
  )
}

export default page