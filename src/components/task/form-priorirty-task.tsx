import { StarIcon } from 'lucide-react'

import { priorityTask } from '@/actions/task/priority-task'
import { customToast } from '@/lib/utils/custom-toast'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface FormPriorityTaskProps {
  priority: boolean
  taskId: string
  listId: string
}
export function FormPriorityTask({
  priority,
  taskId,
  listId,
}: FormPriorityTaskProps) {
  async function handleTogglePriorityAction(formData: FormData) {
    const res = await priorityTask(formData)
    customToast(res?.status, res?.message)
  }
  return (
    <form action={handleTogglePriorityAction}>
      <Input type="hidden" value={taskId} name="taskId" />
      <Input type="hidden" value={listId} name="listId" />
      <Input
        type="hidden"
        value={priority ? 'true' : 'false'}
        name="isPriority"
      />
      <Button
        type="submit"
        title={
          priority ? 'Remova a importancia' : 'Marque a tarefa como importante'
        }
        variant={'ghost'}
        size={'icon'}
        className="group-hover:bg-transparent"
      >
        <StarIcon
          className="text-primary data-[priority=true]:fill-primary"
          data-priority={priority}
        />
      </Button>
    </form>
  )
}
