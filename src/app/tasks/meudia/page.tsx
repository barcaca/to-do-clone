import { Task } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import { FormCreateTask } from '@/components/form/form-create-task'
import { ListHeaderMenu } from '@/components/list-header-menu'
import { TasksList } from '@/components/tasks-list'
import { getUserListByName, getUserTasksByNameAndDay } from '@/lib/data'

export default async function MeuDiaPage() {
  const namePage = 'meudia'
  const lists = await getUserListByName(namePage)
  const tasks = await getUserTasksByNameAndDay(lists.id)
  const [list, task] = await Promise.all([lists, tasks])
  const { id } = list
  const today = new Date()
  const formattedDate = format(today, "EEEE, dd 'de' MMMM", { locale: ptBR })

  return (
    <main className="flex-1 space-y-6 p-6">
      <div>
        <ListHeaderMenu listName={'Meu Dia'} listId={id} />
        <p className="px-2 text-sm text-muted-foreground">{formattedDate}</p>
      </div>
      <FormCreateTask listName={namePage} listId={id} />
      <TasksList tasks={task as Task[]} nameList={namePage} />
    </main>
  )
}
