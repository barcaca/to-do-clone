import { z } from 'zod'

export const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: 'Tarefa é muito curta',
  }),
  listId: z.string(),
  listName: z.string(),
})
