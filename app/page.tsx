'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js' 
import { useRouter } from 'next/navigation'

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

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <main className='flex justify-center items-center mt-[25%]'>
      {!session ? (
        <button onClick={signInWithGoogle} className='cursor-pointer'>Sign in with Google</button>
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <p>こんにちは, {session.user.user_metadata?.full_name || session.user.email}さん</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </main>
  )
}
