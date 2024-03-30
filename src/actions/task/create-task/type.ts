import { FormSchema } from './schema'

export type FormState = {
  errors?: {
    title?: string[]
  }
  message?: string | null
  status: number | undefined
}

export const CreateTask = FormSchema.omit({
  id: true,
})
