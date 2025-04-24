import { toast } from 'sonner'
import { UseFormReturn } from 'react-hook-form'

import { supabase } from '@/lib/supabase/client'
import { EmailAuth } from '@/lib/definitions'

interface Props {
  item: EmailAuth,
  form: UseFormReturn<EmailAuth>
}

export const handleSignUpWithEmail = async ({item, form}: Props) => {
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