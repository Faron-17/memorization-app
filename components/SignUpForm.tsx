"use client"

import React, { useState } from 'react'
import { useEffect } from 'react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { handleSignUpWithEmail } from '@/lib/handlers/handleSignUpWithEmail'
import { LINKS } from '@/constants'

const formSchema = z.object({
  email: z.string().nonempty({ message: "入力してください。" }).min(2, { message: "2文字以上で入力してください。" }).max(300, { message: "300文字以内で入力してください。" }),
  password: z.string().nonempty({ message: "入力してください。" }).min(2, { message: "2文字以上で入力してください。" }).max(100, { message: "100文字以内で入力してください。" }),
  displayName: z.string().nonempty({ message: "入力してください。" }).min(2, { message: "2文字以上で入力してください。" }).max(10, { message: "10文字以内で入力してください。" }),
})

const SignUpForm = () => {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    }
  })

  async function signUpNewUser(item: z.infer<typeof formSchema>) {
    setIsDisabled(true)
    await handleSignUpWithEmail({item, form})
    setIsDisabled(false)
  }

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(signUpNewUser)} className="space-y-8 h-full flex flex-col justify-center items-center">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem className="mb-3 w-full">
                  <FormControl>
                    <Input placeholder="表示名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <Button type="submit" className="cursor-pointer w-full" disabled={isDisabled}>新規登録する</Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default SignUpForm