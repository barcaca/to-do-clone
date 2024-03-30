'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

import { DeleteTask, FormState } from './type'

// Cria uma nova lista no banco de dados.
export async function deleteTask(formData: FormData): Promise<FormState> {
  // Obtém a sessão de autenticação
  const session = await getAuthSession()

  // Se não houver sessão, retorna um erro
  if (!session) return { message: 'Error: Usuario não logado', status: 400 }

  // Valida formulário usando Zod
  const validatedFields = DeleteTask.safeParse({
    taskId: formData.get('taskId'),
    listId: formData.get('listId'),
  })

  // Se a validação do formulário falhar, retorne os erros antecipadamente. Caso contrário, continue.
  if (!validatedFields.success) {
    return {
      message: 'Campos ausentes.Falha ao Deletar tarefa',
      status: 400,
    }
  }
  // Prepara os dados para inserção no banco de dados
  const { taskId, listId } = validatedFields.data
  console.log(listId)

  // Inserir dados no banco de dados
  try {
    await db.task.delete({
      where: { id: taskId },
    })
  } catch (error) {
    // Se ocorrer um erro no banco de dados, retorne um erro mais específico.
    return {
      message: 'Database Error: Falha ao Deletar Tarefa',
      status: 400,
    }
  }
  // Revalidar o cache da página de tarefas e redirecionar o usuário.
  revalidatePath(`/tasks/${listId}`)
  return {
    message: 'Tarefa deletada com sucesso',
    status: 200,
  }
}
