'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

import { DeleteList, FormState } from './type'

// Cria uma nova lista no banco de dados.
export async function deleteList(formData: FormData): Promise<FormState> {
  // Obtém a sessão de autenticação
  const session = await getAuthSession()

  // Se não houver sessão, retorna um erro
  if (!session) return { message: 'Error: Usuario não logado', status: 400 }

  // Valida formulário usando Zod
  const validatedFields = DeleteList.safeParse({
    id: formData.get('id'),
  })

  // Se a validação do formulário falhar, retorne os erros antecipadamente. Caso contrário, continue.
  if (!validatedFields.success) {
    return {
      message: 'Campos ausentes.Falha ao Deletar lista',
      status: 400,
    }
  }
  // Prepara os dados para inserção no banco de dados
  const { id } = validatedFields.data

  // Inserir dados no banco de dados
  try {
    await db.list.delete({
      where: { id },
    })
  } catch (error) {
    // Se ocorrer um erro no banco de dados, retorne um erro mais específico.
    return {
      message: 'Database Error: Falha ao Deletar Lista',
      status: 400,
    }
  }
  // Revalidar o cache da página de tarefas e redirecionar o usuário.
  revalidatePath('/tasks/tarefas')
  return {
    message: 'Lista deletada com sucesso',
    status: 200,
  }
}
