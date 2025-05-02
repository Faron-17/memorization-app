import { z } from "zod"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { formSchemaItem } from "@/lib/validation"
import { Item } from "@/lib/definitions"

export const useFormItem = (item:Pick<Item, 'title' | 'answer'> | undefined) => {
  return useForm<z.infer<typeof formSchemaItem>>({
    resolver: zodResolver(formSchemaItem),
    defaultValues: item
      ? { title: item.title, answer: item.answer }
      : { title: "", answer: "" },
  })
}