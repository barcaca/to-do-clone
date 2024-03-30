import { z } from 'zod'

export const FormSchema = z.object({
  taskId: z.string(),
  listId: z.string(),
  isCompleted: z.string(),
})
