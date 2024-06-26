'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

import { FormState, PrioritySchema } from './type'
// Cria uma nova lista no banco de dados.
export async function priorityTask(formData: FormData): Promise<FormState> {
  // Obtém a sessão de autenticação
  const session = await getAuthSession()

  // Se não houver sessão, retorna um erro
  if (!session) return { message: 'Error: Usuario não logado', status: 400 }

  // Valida formulário usando Zod
  const validatedFields = PrioritySchema.safeParse({
    taskId: formData.get('taskId'),
    listId: formData.get('listId'),
    isPriority: formData.get('isPriority'),
  })

  // Se a validação do formulário falhar, retorne os erros antecipadamente. Caso contrário, continue.
  if (!validatedFields.success) {
    return {
      message: 'Campos ausentes. Falha ao Priorizar Tarefa',
      status: 400,
    }
  }
  // Prepara os dados para inserção no banco de dados
  const { taskId, listId, isPriority } = validatedFields.data
  const userId = session.user.id
  const togglePriority = isPriority === 'true'

  // Inserir dados no banco de dados
  try {
    await db.task.update({
      where: { id: taskId, userId },
      data: {
        priority: !togglePriority,
      },
    })
  } catch (error) {
    // Se ocorrer um erro no banco de dados, retorne um erro mais específico.
    return {
      message: 'Database Error: Falha ao Priorizar Tarefa',
      status: 500,
    }
  }
  if (togglePriority) {
    revalidatePath(`/tasks/${listId}`)
    return {
      message: 'Tarefa despriorizado com sucesso',
      status: 200,
    }
  }
  // Revalidar o cache da página de tarefas e redirecionar o usuário.
  revalidatePath(`/tasks/${listId}`)
  return {
    message: 'Tarefa priorizada com sucesso',
    status: 200,
  }
}
