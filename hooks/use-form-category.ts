import { z } from "zod"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { formSchemaCategory } from "@/lib/validation"

export const useFormCategory = ({type, name, pin}: {type: string, name?: string, pin?: boolean}) => {
  return useForm<z.infer<typeof formSchemaCategory>>({
    resolver: zodResolver(formSchemaCategory),
    defaultValues: type === 'create'
      ? { name: '',  pin: false }
      : { name: name,  pin: pin }
  })
}