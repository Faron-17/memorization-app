import React from 'react'

import { login, signup } from './actions'

import type { Metadata } from "next";
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'ログイン',
}

const page = () => {
  return (
    <div className='flex justify-center h-full items-center'>
      <Card className='w-sm px-8 py-10'>
        <form>
          <Label htmlFor="email">Email:</Label>
          <Input id="email" name="email" type="email" required className='mt-3'/>
          <Label htmlFor="password" className='mt-6'>Password:</Label>
          <Input id="password" name="password" type="password" required className='mt-3' />
          <Button formAction={login} className='cursor-pointer mt-12'>Log in</Button>
          <Button formAction={signup} className='cursor-pointer ml-5'>Sign up</Button>
        </form>
      </Card>
    </div>
  )
}

export default page