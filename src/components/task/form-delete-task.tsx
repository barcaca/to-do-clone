import { deleteTask } from '@/actions/task/delete-task'
import { customToast } from '@/lib/utils/custom-toast'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface FormDeleteListProps {
  taskId: string
  listId: string
}
export function FormDeleteTask({ taskId, listId }: FormDeleteListProps) {
  async function handleDeleteAction(formData: FormData) {
    const res = await deleteTask(formData)
    customToast(res?.status, res?.message)
  }

  return (
    <form action={handleDeleteAction}>
      <Input type="hidden" value={taskId} name="taskId" />
      <Input type="hidden" value={listId} name="listId" />
      <Button
        type="submit"
        variant={'destructive'}
        title="Deletar Lista"
        className="w-full "
      >
        Confirmar
      </Button>
    </form>
  )
}
