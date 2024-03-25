import { FormCreateTask } from '@/components/form/form-create-task'
import { ListHeaderMenu } from '@/components/list-header-menu'
import { getUserListByName } from '@/lib/data'

export default async function ImportantePage() {
  const namePage = 'importante'
  const list = await getUserListByName(namePage)
  const { id } = list
  return (
    <div className="flex-1">
      <ListHeaderMenu listName={'Importante'} listId={id} />
      <FormCreateTask />
    </div>
  )
}
