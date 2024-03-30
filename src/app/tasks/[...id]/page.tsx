import { Task } from '@prisma/client'

import { FormCreateTask } from '@/components/form/form-create-task'
import { ListHeaderMenu } from '@/components/list-header-menu'
import { TasksList } from '@/components/tasks-list'
import { getUserListById, getUserTasksByName } from '@/lib/data'

export default async function IdPage({ params }: { params: { id: string } }) {
  const id = String(params.id)
  const nameLists = await getUserListById(id)
  const tasks = await getUserTasksByName(id)
  const [nameList, task] = await Promise.all([nameLists, tasks])

  if (!nameList) {
    return null
  }
  return (
    <main className="flex-1 space-y-6 p-6">
      <ListHeaderMenu listName={nameList} isListCreated={true} listId={id} />
      <FormCreateTask listName={id} listId={id} />
      <TasksList tasks={task as Task[]} nameList={id} />
    </main>
  )
}
