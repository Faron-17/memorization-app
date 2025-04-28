'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Session } from '@supabase/supabase-js' 
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SignUpForm from '@/components/SignUpForm';
import SignInForm from '@/components/SignInForm';

import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { LINKS } from '@/constants';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const [registerFlag, setRegisterFlag] = useState<boolean>(false)
  const router = useRouter()
  
  useEffect(() => {
    const currentSession = supabase.auth.getSession()
    currentSession.then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      if (session) {
        router.push(LINKS.mypage)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <main className='flex flex-col justify-center items-center mt-[10%]'>
      <h1 className='text-2xl font-semibold'>Memorization App</h1>
      {!session && 
        <Card className='w-80 p-10 mt-6'>
          <CardHeader className='px-0'>
            <CardTitle className='text-center text-lg'>{registerFlag ? "新規登録" : "ログイン"}</CardTitle>
            <CardDescription className='pt-2'>ようこそ！Memorization Appはマークダウンで書ける暗記アプリです</CardDescription>
          </CardHeader>
          <Button
            onClick={signInWithGoogle}
            className="mt-3 cursor-pointer flex items-center justify-center px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none pr-6"
          >
            <FcGoogle className="w-6 h-6 mr-2" />
            <span>Google</span>
          </Button>
          <div className='flex items-center w-full'>
            <Separator className='flex-1' /><p className='px-5'>or</p><Separator className='flex-1' />
          </div>
          {
            registerFlag ? <SignUpForm /> : <SignInForm />
          } 
          <Button variant='ghost' className={cn('cursor-pointer hover:underline hover:bg-inherit', registerFlag ? 'hidden' : 'block')} onClick={() => setRegisterFlag(true)}>新規登録はこちら</Button>
          <Button variant='ghost' className={cn('cursor-pointer hover:underline hover:bg-inherit', registerFlag ? 'block' : 'hidden')} onClick={() => setRegisterFlag(false)}>ログインはこちら</Button>
        </Card>
      }
    </main>
  )
}
