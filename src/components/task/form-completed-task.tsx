import { CheckIcon, CircleIcon } from 'lucide-react'

import { completedTask } from '@/actions/task/completed-task'
import { customToast } from '@/lib/utils/custom-toast'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface FormCompletedTaskProps {
  completed: boolean
  taskId: string
  listId: string
  title?: string
}
export function FormCompletedTask({
  completed,
  taskId,
  listId,
  title,
}: FormCompletedTaskProps) {
  async function handleToggleCompletedAction(formData: FormData) {
    const res = await completedTask(formData)
    customToast(res?.status, res?.message)
  }
  return (
    <form action={handleToggleCompletedAction} className="w-full">
      <Input type="hidden" value={taskId} name="taskId" />
      <Input type="hidden" value={listId} name="listId" />
      <Input
        type="hidden"
        value={completed ? 'true' : 'false'}
        name="isCompleted"
      />
      <Button
        type="submit"
        title={completed ? 'Atualize a Tarefa' : 'Complete a Tarefa'}
        variant={'ghost'}
        size={'icon'}
        className="group/button relative w-full items-center justify-start rounded-none px-3 group-hover:bg-transparent"
      >
        <CircleIcon
          className="text-primary data-[completed=true]:fill-primary"
          data-completed={completed}
        />
        {!title && (
          <CheckIcon
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-card group-hover/button:text-primary data-[completed=true]:hidden"
            data-completed={completed}
            size={16}
          />
        )}
        {title && <span className="ml-4">{title}</span>}
      </Button>
    </form>
  )
}
