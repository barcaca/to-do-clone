'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

import { CreateList, FormState } from './type'

// Cria uma nova lista no banco de dados.
export async function createList(formData: FormData): Promise<FormState> {
  // Obtém a sessão de autenticação
  const session = await getAuthSession()

  // Se não houver sessão, retorna um erro
  if (!session) return { message: 'Error: Usuario não logado', status: 400 }

  // Valida formulário usando Zod
  const validatedFields = CreateList.safeParse({
    title: formData.get('title'),
  })

  // Se a validação do formulário falhar, retorne os erros antecipadamente. Caso contrário, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos ausentes. Falha ao Criar lista',
      status: 400,
    }
  }
  // Prepara os dados para inserção no banco de dados
  const { title: name } = validatedFields.data
  const userId = session.user.id
  let list

  // Inserir dados no banco de dados
  try {
    list = await db.list.create({
      data: {
        name,
        userId,
      },
    })
  } catch (error) {
    // Se ocorrer um erro no banco de dados, retorne um erro mais específico.
    return {
      message: 'Database Error: Falha ao Criar Lista',
      status: 500,
    }
  }
  // Revalidar o cache da página de tarefas e redirecionar o usuário.
  revalidatePath(`/tasks/${list?.id}`)
  return {
    message: 'Lista criada com sucesso',
    status: 200,
    url: `/tasks/${list?.id}`,
  }
}
