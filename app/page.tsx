'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Session } from '@supabase/supabase-js' 
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button'

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    const currentSession = supabase.auth.getSession()
    currentSession.then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      if (session) {
        router.push('/my-page')
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/my-page`
      }
    })
  }

  return (
    <main className='flex justify-center items-center mt-[25%]'>
      {!session && 
        <Button
          onClick={signInWithGoogle}
          className="cursor-pointer flex items-center justify-center px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none pr-6"
        >
          <FcGoogle className="w-6 h-6 mr-2" />
          <span>Googleでログイン</span>
        </Button>
      }
    </main>
  )
}
