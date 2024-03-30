import { CheckIcon, CircleIcon } from 'lucide-react'

import { completedTask } from '@/actions/task/completed-task'
import { customToast } from '@/lib/utils/custom-toast'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface FormCompletedTaskProps {
  completed: boolean
  taskId: string
  listId: string
}
export function FormCompletedTask({
  completed,
  taskId,
  listId,
}: FormCompletedTaskProps) {
  async function handleToggleCompleted(formData: FormData) {
    const res = await completedTask(formData)
    customToast(res?.status, res?.message)
  }
  return (
    <form action={handleToggleCompleted}>
      <Input type="hidden" value={taskId} name="taskId" />
      <Input type="hidden" value={listId} name="listId" />
      <Input
        type="hidden"
        value={completed ? 'true' : 'false'}
        name="isCompleted"
      />
      <Button
        title={completed ? 'Atualize a Tarefa' : 'Complete a Tarefa'}
        type="submit"
        variant={'ghost'}
        size={'icon'}
        className="group/button relative items-center justify-center group-hover:bg-transparent"
      >
        <CircleIcon
          className="text-primary data-[completed=true]:fill-primary"
          data-completed={completed}
        />
        <CheckIcon
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-card group-hover/button:text-primary data-[completed=true]:hidden"
          data-completed={completed}
          size={16}
        />
      </Button>
    </form>
  )
}
