import { z } from "zod"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { formSchemaSignUp } from "@/lib/validation"

export const useFormSignup = () => {
  return useForm<z.infer<typeof formSchemaSignUp>>({
    resolver: zodResolver(formSchemaSignUp),
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    }
  })
}