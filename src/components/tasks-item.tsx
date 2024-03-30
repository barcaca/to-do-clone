import { Task } from '@prisma/client'

import { FormCompletedTask } from './task/form-completed-task'
import { FormPriorityTask } from './task/form-priorirty-task'
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
              taskId={task.id}
              listId={listId}
              completed={task.completed}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">{task.title}</CardContent>
        <CardFooter className="p-0">
          <FormPriorityTask
            taskId={task.id}
            listId={listId}
            priority={task.priority}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
