import { Task } from '@prisma/client'
import { StarIcon } from 'lucide-react'

import { FormCompletedTask } from './task/form-completed-task'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
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
            <FormCompletedTask
              completed={task.completed}
              taskId={task.id}
              listId={listId}
            />
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
