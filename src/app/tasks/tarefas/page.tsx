import { FormCreateTask } from '@/components/form/form-create-task'
import { ListHeaderMenu } from '@/components/list-header-menu'
import { getUserListByName } from '@/lib/data'

export default async function TarefasPage() {
  const namePage = 'tarefas'
  const list = await getUserListByName(namePage)
  const { id } = list
  return (
    <main className="flex-1">
      <ListHeaderMenu listName={'Tarefas'} listId={id} />
      <FormCreateTask />
    </main>
  )
}
