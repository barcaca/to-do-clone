import { List, Task } from '@prisma/client'
import { cache } from 'react'

import { getAuthSession } from './auth'
import { db } from './db'

/**
 * Busca a lista de tarefas do usuário logado.
 *
 * @throws {Error} Se o usuário não estiver logado.
 * @throws {Error} Se a lista não for encontrada.
 * @throws {Error} Se ocorrer um erro ao buscar a lista.
 *
 * @returns {Promise<List>} Uma promessa que resolve para a lista de tarefas do usuário.
 */
async function fetchUserList(): Promise<List> {
  // Obtém a sessão do usuário.
  const session = await getAuthSession()

  // Verifica se o usuário está logado.
  if (!session) {
    throw new Error('Error: Usuário não logado')
  }

  // Obtém o ID do usuário.
  const userId = session.user.id

  try {
    // Busca a lista do usuário no banco de dados.
    const data = await db.list.findFirst({
      where: { userId },
    })

    // Verifica se a lista foi encontrada.
    if (!data) {
      throw new Error('Error: Lista não encontrado')
    }

    // Retorna a lista.
    return data
  } catch (error) {
    // Lança um erro database para o cliente.
    throw new Error('Database Error: Falha ao buscar lista')
  }
}
// Exporta a função buscando a lista, com cache.
export const getUserList = cache(fetchUserList)

/**
 *  Busca uma lista de tarefas do usuário logado pelo nome. Cria a lista se ela não existir.
 *
 *  @param {string} name - O nome da lista a ser buscado.
 *
 *  @throws {Error} Se o usuário não estiver logado.
 *  @throws {Error} Se ocorrer um erro ao buscar ou criar a lista.
 *
 *  @returns {Promise<List>} Uma promessa que resolve para a lista de tarefas encontrada ou criada.
 */
async function fetchUserListByName(name: string): Promise<List> {
  // Obtém a sessão do usuário.
  const session = await getAuthSession()

  // Verifica se o usuário está logado.
  if (!session) {
    throw new Error('Erro: Usuário não logado')
  }

  // Obtém o ID do usuário.
  const userId = session.user.id

  try {
    // Busca a lista pelo nome no banco de dados.
    const list = await db.list.findFirst({
      where: {
        name,
        userId,
      },
    })
    // Se a lista não for encontrada, cria uma nova lista.
    if (!list) {
      const newList = await db.list.create({
        data: {
          name,
          userId,
        },
      })
      // Verifica se a criação da lista foi bem-sucedida.
      if (!newList) {
        throw new Error('Erro: Falha ao criar lista')
      }
      // Retorna a lista recém-criada.
      return newList
    }
    // Retorna a lista encontrada.
    return list
  } catch (error) {
    // Lança um erro database para o cliente.
    throw new Error('Database Error: Falha ao buscar ou criar lista do usuário')
  }
}
// Exporta a função buscando a lista pelo nome, com cache.
export const getUserListByName = cache(fetchUserListByName)

/**
 * Busca o nome da lista de tarefas do usuário pelo ID.
 *
 * @param {string} id - O ID da lista a ser buscada.
 *
 * @throws {Error} Se o usuário não estiver logado.
 * @throws {Error} Se a lista não for encontrada.
 * @throws {Error} Se ocorrer um erro ao buscar a lista.
 *
 * @returns {Promise<string>} Uma promessa que resolve para o nome da lista de tarefas do usuário.
 */
async function fetchUserListById(id: string): Promise<string> {
  try {
    const session = await getAuthSession()
    if (!session) {
      throw new Error('Error: Usuario não logado')
    }

    const list = await db.list.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
      },
    })
    if (!list) {
      throw new Error('Error: Lista não encontrada')
    }

    return list?.name
  } catch (error) {
    throw new Error('Falha para buscar lista do usuário.')
  }
}
export const getUserListById = cache(fetchUserListById)

async function fetchUserListName() {
  try {
    const session = await getAuthSession()
    if (!session) return
    const id = session.user.id
    const data = await db.user.findFirst({
      where: { id },
      include: {
        lists: {
          where: {
            NOT: {
              name: { in: ['meudia', 'importante', 'tarefas', 'planejado'] },
            },
          },
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    if (!data) {
      throw new Error('Erro: usuário não encontrado')
    }
    return data.lists
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Falha para buscar lista do usuário.')
  }
}

export const getUserListName = cache(fetchUserListName)

async function fetchUserTaskByName(id: string) {
  try {
    const session = await getAuthSession()
    if (!session) {
      throw new Error('Error: Usuario não logado')
    }
    const userId = session.user.id
    const data = await db.list.findFirst({
      where: { id, userId },
      include: {
        tasks: true,
      },
    })
    if (!data) {
      throw new Error('Erro: usuário não encontrado')
    }
    return data?.tasks
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Falha para buscar lista do usuário.')
  }
}

export const getUserTasksByName = cache(fetchUserTaskByName)

async function fetchUserTaskByNameAndDay(id: string): Promise<Task[]> {
  const today = new Date()
  try {
    const session = await getAuthSession()
    if (!session) {
      throw new Error('Error: Usuario não logado')
    }
    const userId = session.user.id
    // Define the start and end of the current day
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    )

    const data = await db.list.findFirst({
      where: { id, userId },
      include: {
        tasks: {
          where: {
            createdAt: {
              gte: startDate,
            },
          },
        },
      },
    })
    if (!data) {
      throw new Error('Erro: usuário não encontrado')
    }
    return data?.tasks || []
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Falha para buscar lista do usuário.')
  }
}

export const getUserTasksByNameAndDay = cache(fetchUserTaskByNameAndDay)

async function fetchAllUserTasks(): Promise<Task[]> {
  // Obtém a sessão do usuário.
  const session = await getAuthSession()

  // Verifica se o usuário está logado.
  if (!session) {
    throw new Error('Erro: Usuário não logado')
  }

  // Obtém o ID do usuário.
  const userId = session.user.id
  try {
    // Busca a lista do usuário no banco de dados.
    const data = await db.task.findMany({
      where: { userId },
    })

    // Verifica se a tarefa foi encontrada.
    if (!data) {
      throw new Error('Error: Tarefas não encontrado')
    }

    // Retorna as tarefas.
    return data
  } catch (error) {
    // Lança um erro database para o cliente.
    throw new Error('Database Error: Falha ao buscar tarefas do usuário')
  }
}
// Exporta a função buscando a tarefas, com cache.
export const getAllUserTasks = cache(fetchAllUserTasks)

async function fetchUserHighPriorityTasks(): Promise<Task[]> {
  // Obtém a sessão do usuário.
  const session = await getAuthSession()

  // Verifica se o usuário está logado.
  if (!session) {
    throw new Error('Erro: Usuário não logado')
  }

  // Obtém o ID do usuário.
  const id = session.user.id

  try {
    // Busca a lista do usuário no banco de dados.
    const data = await db.user.findFirst({
      where: { id },
      include: {
        tasks: {
          where: {
            priority: true,
          },
        },
      },
    })

    // Verifica se a tarefa foi encontrada.
    if (!data) {
      throw new Error('Error: Tarefas não encontrado')
    }

    // Retorna as tarefas.
    return data.tasks
  } catch (error) {
    // Lança um erro database para o cliente.
    throw new Error('Database Error: Falha ao buscar tarefas do usuário')
  }
}

export const getUserHighPriorityTasks = cache(fetchUserHighPriorityTasks)
