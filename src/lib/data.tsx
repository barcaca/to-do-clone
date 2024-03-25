import { List } from '@prisma/client'
import { cache } from 'react'

import { getAuthSession } from './auth'
import { db } from './db'
export async function fetchUserList() {
  try {
    const session = await getAuthSession()
    if (!session) return
    const id = session.user.id
    const data = await db.user.findFirst({
      where: { id },
      include: {
        lists: true,
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

async function fetchUserListByName(name: string): Promise<List> {
  try {
    const session = await getAuthSession()
    if (!session) {
      throw new Error('Error: Usuario não logado')
    }

    const list = await db.list.findFirst({
      where: {
        name,
        userId: session.user.id,
      },
    })
    if (!list) {
      const newList = await db.list.create({
        data: {
          name,
          userId: session.user.id,
        },
      })
      if (!newList) {
        throw new Error('Error: Lista não encontrada')
      }
      return newList
    }
    return list
  } catch (error) {
    throw new Error('Falha para buscar lista do usuário.')
  }
}
export const getUserListByName = cache(fetchUserListByName)

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
