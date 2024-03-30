'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

import { CompletedTask, FormState } from './type'
// Cria uma nova lista no banco de dados.
export async function completedTask(formData: FormData): Promise<FormState> {
  // Obtém a sessão de autenticação
  const session = await getAuthSession()

  // Se não houver sessão, retorna um erro
  if (!session) return { message: 'Error: Usuario não logado', status: 400 }

  // Valida formulário usando Zod
  const validatedFields = CompletedTask.safeParse({
    id: formData.get('id'),
    listId: formData.get('listId'),
    isCompleted: formData.get('isCompleted'),
  })

  // Se a validação do formulário falhar, retorne os erros antecipadamente. Caso contrário, continue.
  if (!validatedFields.success) {
    return {
      message: 'Campos ausentes. Falha ao Criar Tarefa',
      status: 400,
    }
  }
  // Prepara os dados para inserção no banco de dados
  const { id, listId, isCompleted } = validatedFields.data
  const userId = session.user.id
  const toggleCompleted = isCompleted === 'true'
  console.log(toggleCompleted)

  // Inserir dados no banco de dados
  try {
    await db.task.update({
      where: { id, userId },
      data: {
        completed: !toggleCompleted,
      },
    })
  } catch (error) {
    // Se ocorrer um erro no banco de dados, retorne um erro mais específico.
    return {
      message: 'Database Error: Falha ao Criar Tarefa',
      status: 500,
    }
  }
  // Revalidar o cache da página de tarefas e redirecionar o usuário.
  revalidatePath(`/tasks/${listId}`)
  return {
    message: 'Tarefa criada com sucesso',
    status: 200,
  }
}
