"use client"

import React, { useState } from 'react'
import { useEffect } from 'react'
import { z } from 'zod'
import { FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { handleSignUpWithEmail } from '@/lib/handlers/handleSignUpWithEmail'
import { LINKS } from '@/constants'
import { useFormSignup } from '@/hooks/use-form-signup'
import { formSchemaSignUp } from '@/lib/validation'
import FormFieldInput from '@/components/FormFieldInput'

const SignUpForm = () => {
  const router = useRouter()
  const [ isDisabled, setIsDisabled ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("");

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push(LINKS.mypage)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  const form = useFormSignup()

  const signUpNewUser = async (item: z.infer<typeof formSchemaSignUp>) => {
    setIsDisabled(true)
    try {
      await handleSignUpWithEmail({item, form})
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage("予期せぬエラーが発生しました");
      }
    } finally {
      setIsDisabled(false)
    }
  }

  return (
    <div>
      {errorMessage.length > 0 && (
        <div className="text-sm text-red-500 pb-5">{errorMessage}</div>
      )}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(signUpNewUser)} className="space-y-4 h-full flex flex-col justify-center items-center">
          <FormFieldInput control={form.control} name="displayName" placeholder="表示名" />
          <FormFieldInput control={form.control} name="email" placeholder="メールアドレス" />
          <FormFieldInput control={form.control} name="password" placeholder="パスワード" />
          <Button type="submit" className="cursor-pointer w-full" disabled={isDisabled}>新規登録する</Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default SignUpForm