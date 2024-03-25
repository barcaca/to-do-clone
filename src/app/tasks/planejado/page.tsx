import { FormCreateTask } from '@/components/form/form-create-task'
import { ListHeaderMenu } from '@/components/list-header-menu'
import { getUserListByName } from '@/lib/data'

export default async function PlanejadoPage() {
  const namePage = 'planejado'
  const list = await getUserListByName(namePage)
  const { id } = list
  return (
    <div className="flex-1">
      <ListHeaderMenu listName={'Planejado'} listId={id} />
      <FormCreateTask />
    </div>
  )
}
