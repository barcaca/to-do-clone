import { z } from 'zod'

export const FormSchema = z.object({
  id: z.string(),
  listId: z.string(),
  isPriority: z.string(),
})
