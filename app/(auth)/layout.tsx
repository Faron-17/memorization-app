import React from 'react'

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='h-full'>
      {children}
    </div>
  )
}

export default layout