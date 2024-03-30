import { FormSchema } from './schema'

export type FormState = {
  message?: string | null
  status: number | undefined
}

export const PrioritySchema = FormSchema
