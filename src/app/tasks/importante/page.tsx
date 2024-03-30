import { Task } from '@prisma/client'

import { ListHeaderMenu } from '@/components/list-header-menu'
import { FormCreateTask } from '@/components/task/form-create-task'
import { TasksList } from '@/components/tasks-list'
import { getUserHighPriorityTasks, getUserListByName } from '@/lib/data'

export default async function ImportantePage() {
  const namePage = 'importante'
  const lists = await getUserListByName(namePage)
  const tasks = await getUserHighPriorityTasks()
  const [list, task] = await Promise.all([lists, tasks])
  const { id } = list
  return (
    <main className="flex-1 space-y-6 p-6">
      <ListHeaderMenu listName={'Importante'} listId={id} />
      <FormCreateTask listName={namePage} listId={id} />
      <TasksList tasks={task as Task[]} nameList={namePage} />
    </main>
  )
}
