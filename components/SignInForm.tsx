"use client"

import React, { useState } from 'react'
import { useEffect } from 'react'
import { z } from 'zod'
import { FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { handleSignInWithEmail } from '@/lib/handlers/handleSignInWithEmail'
import { LINKS } from '@/constants'
import { useFormSignin } from '@/hooks/use-form-signin'
import { formSchemaSignIn } from '@/lib/validation'

const SignInForm = () => {
  const router = useRouter()
  const [ isDisabled, setIsDisabled ] = useState(false)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push(LINKS.mypage)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  const form = useFormSignin()

  const signInWithEmail = async (item: z.infer<typeof formSchemaSignIn>) => {
    setIsDisabled(true)
    try {
      return await handleSignInWithEmail({item})
    } catch {
      setIsDisabled(false)
    }
  }

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(signInWithEmail)} className="space-y-8 h-full flex flex-col justify-center items-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3 w-full">
                <FormControl>
                  <Input placeholder="メールアドレス" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-3 w-full">
                <FormControl>
                  <Input placeholder="パスワード" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer w-full" disabled={isDisabled}>ログインする</Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default SignInForm