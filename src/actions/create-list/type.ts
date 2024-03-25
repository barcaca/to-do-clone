import { FormSchema } from './schema'

export type FormState = {
  errors?: {
    title?: string[]
  }
  message?: string | null
  status: number | undefined
  url?: string
}

export const CreateList = FormSchema.omit({ id: true })
