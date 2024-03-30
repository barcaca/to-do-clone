import { Task } from '@prisma/client'

import { FormCreateTask } from '@/components/form/form-create-task'
import { ListHeaderMenu } from '@/components/list-header-menu'
import { TasksList } from '@/components/tasks-list'
import { getUserListByName, getUserTasksByName } from '@/lib/data'

export default async function PlanejadoPage() {
  const namePage = 'planejado'
  const lists = await getUserListByName(namePage)
  const tasks = await getUserTasksByName(lists.id)
  const [list, task] = await Promise.all([lists, tasks])
  const { id } = list
  return (
    <main className="flex-1 space-y-6 p-6">
      <ListHeaderMenu listName={'Planejado'} listId={id} />
      <FormCreateTask listName={namePage} listId={id} />
      <TasksList tasks={task as Task[]} nameList={namePage} />
    </main>
  )
}
