import { z } from "zod"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { formSchemaSignIn } from "@/lib/validation"

export const useFormSignin = () => {
  return useForm<z.infer<typeof formSchemaSignIn>>({
    resolver: zodResolver(formSchemaSignIn),
    defaultValues: {
      email: '',
      password: '',
    }
  })
}