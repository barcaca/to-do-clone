import { Task } from '@prisma/client'
import { CheckIcon, CircleIcon, StarIcon } from 'lucide-react'

import { completedTask } from '@/actions/completed-task'

import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
interface TasksItemProps {
  task: Task
  listId: string
}
export function TasksItem({ task, listId }: TasksItemProps) {
  return (
    <div>
      <Card className="group flex cursor-pointer items-center space-x-4 px-4 py-2 hover:bg-muted">
        <CardHeader className="p-0">
          <CardTitle className="">
            <form action={completedTask}>
              <Input type="hidden" value={task.id} name="id" />
              <Input type="hidden" value={listId} name="listId" />
              <Input
                type="hidden"
                value={task.completed ? 'true' : 'false'}
                name="isCompleted"
              />
              <Button
                title={
                  task.completed ? 'Atualize a Tarefa' : 'Complete a Tarefa'
                }
                type="submit"
                variant={'ghost'}
                size={'icon'}
                className="group/button relative items-center justify-center group-hover:bg-transparent"
              >
                <CircleIcon
                  className="text-primary data-[completed=true]:fill-primary"
                  data-completed={task.completed}
                />
                <CheckIcon
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-card group-hover/button:text-primary data-[completed=true]:hidden"
                  data-completed={task.completed}
                  size={16}
                />
              </Button>
            </form>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">{task.title}</CardContent>
        <CardFooter className="p-0">
          <Button
            title={
              task.priority
                ? 'Remova a importancia'
                : 'Marque a tarefa como importante'
            }
            variant={'ghost'}
            size={'icon'}
            className="group-hover:bg-transparent"
          >
            <StarIcon
              className="text-primary data-[priority=true]:fill-primary"
              data-priority={task.priority}
            />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
