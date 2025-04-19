"use client"

import React from 'react'
import { useEffect } from 'react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().min(2, { message: "2文字以上で入力してください。" }).max(300, { message: "300文字以内で入力してください。" }),
  password: z.string().min(2, { message: "2文字以上で入力してください。" }).max(100, { message: "100文字以内で入力してください。" }),
  displayName: z.string().min(2, { message: "2文字以上で入力してください。" }).max(10, { message: "10文字以内で入力してください。" }),
})

const SignInUpForm = ({registerFlag}: {registerFlag: boolean}) => {
  const router = useRouter()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/my-page')
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

  const signInWithEmail = async (item: z.infer<typeof formSchema>) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: item.email,
      password: item.password,
    })

    if(data.user === null) {
      toast("登録のないユーザーです")
    }

    if(error) {
      toast("エラー")
    }
  }

  async function signUpNewUser(item: z.infer<typeof formSchema>) {
    const { data, error } = await supabase.auth.signUp({
      email: item.email,
      password: item.password,
      options: {
        data: {
          display_name: item.displayName,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    })

    if(error?.status === 422) {
      toast("既に登録済みの可能性があります。メールを確認し、登録を完了してください")
    } else if(error || data.user === null) {
      toast("エラー")
    } else {
      toast("メールを確認し、登録を完了してください")
      form.reset()
    }
  }

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={registerFlag ? form.handleSubmit(signUpNewUser) : form.handleSubmit(signInWithEmail)} className="space-y-8 h-full flex flex-col justify-center items-center">
          {registerFlag &&
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
          }
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
          <Button type="submit" className="cursor-pointer w-full">{registerFlag ? "新規登録する" : "ログインする"}</Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default SignInUpForm