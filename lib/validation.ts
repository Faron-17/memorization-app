import { z } from "zod"
import { ERROR_MESSAGE } from "@/constants"

export const formSchemaItem = z.object({
  title: z.string().min(2, { message: ERROR_MESSAGE.min(2)}).max(300, { message: ERROR_MESSAGE.max(300) }),
  answer: z.string().min(2, { message: ERROR_MESSAGE.min(2) }).max(10000, { message: ERROR_MESSAGE.max(10000) }),
})

export const formSchemaCategory = z.object({
  name: z.string().min(2, { message: ERROR_MESSAGE.min(2) }).max(10, { message: ERROR_MESSAGE.max(10)}),
  pin: z.boolean()
})

export const formSchemaSignIn = z.object({
  email: z.string().nonempty({ message: ERROR_MESSAGE.nonempty}).min(2, { message: ERROR_MESSAGE.min(2) }).max(300, { message: ERROR_MESSAGE.max(300) }),
  password: z.string().nonempty({ message: ERROR_MESSAGE.nonempty }).min(2, { message: ERROR_MESSAGE.min(2) }).max(100, { message: ERROR_MESSAGE.max(100) }),
})

export const formSchemaSignUp = z.object({
  email: z.string().nonempty({ message: ERROR_MESSAGE.nonempty }).min(2, { message: ERROR_MESSAGE.min(2) }).max(300, { message: ERROR_MESSAGE.max(300)}),
  password: z.string().nonempty({ message: ERROR_MESSAGE.nonempty }).min(2, { message: ERROR_MESSAGE.min(2) }).max(100, { message: ERROR_MESSAGE.max(100)}),
  displayName: z.string().nonempty({ message: ERROR_MESSAGE.nonempty }).min(2, { message: ERROR_MESSAGE.min(2) }).max(10, { message: ERROR_MESSAGE.max(10) }),
})