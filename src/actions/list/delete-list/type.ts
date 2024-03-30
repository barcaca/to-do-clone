import { FormSchema } from './schema'

export type FormState = {
  status: number | undefined
  message?: string | null
}

export const DeleteList = FormSchema
