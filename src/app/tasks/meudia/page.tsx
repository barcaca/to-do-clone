import { FormCreateTask } from '@/components/form/form-create-task'
import { ListHeaderMenu } from '@/components/list-header-menu'
import { getUserListByName } from '@/lib/data'

export default async function MeuDiaPage() {
  const namePage = 'meudia'
  const list = await getUserListByName(namePage)
  const { id } = list

  return (
    <div className="flex-1">
      <ListHeaderMenu listName={'Meu Dia'} listId={id} />
      <FormCreateTask />
    </div>
  )
}
