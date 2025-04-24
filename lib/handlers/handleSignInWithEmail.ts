import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

export const handleSignInWithEmail = async ({item}: { item: {email: string, password: string} }) => {
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