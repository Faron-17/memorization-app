import React from 'react'
import { Metadata } from 'next';

import CategoryHeader from '@/components/CategoryHeader'
import ItemHeader from '@/components/ItemHeader'

export const metadata: Metadata = {
  title: 'カテゴリー',
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <>
      <CategoryHeader id={id} />
      <ItemHeader id={id} />
    </>
  )
}

export default page