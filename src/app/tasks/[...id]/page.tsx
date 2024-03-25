import { FormCreateTask } from '@/components/form/form-create-task'
import { ListHeaderMenu } from '@/components/list-header-menu'
import { getUserListById } from '@/lib/data'

export default async function IdPage({ params }: { params: { id: string } }) {
  const id = String(params.id)
  const nameList = await getUserListById(id)

  if (!nameList) {
    return null
  }
  return (
    <div className="flex-1">
      <ListHeaderMenu listName={nameList} isListCreated={true} listId={id} />
      <FormCreateTask />
    </div>
  )
}
