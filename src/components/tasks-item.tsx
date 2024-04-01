import { Task } from '@prisma/client'
import { Trash2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { FormCompletedTask } from './task/form-completed-task'
import { FormDeleteTask } from './task/form-delete-task'
import { FormPriorityTask } from './task/form-priorirty-task'
import { Button, buttonVariants } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './ui/context-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog'
interface TasksItemProps {
  task: Task
  listId: string
}
export function TasksItem({ task, listId }: TasksItemProps) {
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>
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
        </ContextMenuTrigger>
        <ContextMenuContent className="px-0">
          <ContextMenuItem className="px-0"></ContextMenuItem>
          <ContextMenuItem className="px-0">
            <FormPriorityTask
              taskId={task.id}
              listId={listId}
              priority={task.priority}
              title={
                task.priority
                  ? 'Remover a importância'
                  : 'Marcar como importante'
              }
            />
          </ContextMenuItem>
          <ContextMenuItem className="px-0">
            <FormCompletedTask
              taskId={task.id}
              listId={listId}
              completed={task.completed}
              title={
                task.completed
                  ? 'Marcar como não concluída'
                  : 'Marcar como concluída'
              }
            />
          </ContextMenuItem>
          <ContextMenuSeparator />
          <DialogTrigger asChild>
            <ContextMenuItem className="px-0 text-destructive ">
              <div
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'w-full justify-start gap-4 rounded-none px-4 hover:bg-none hover:text-destructive',
                )}
              >
                <Trash2Icon />
                Excluir Tarefa
              </div>
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader className="font-semibold">
          &ldquo;{task.title}&ldquo; será definitivamente excluída.
        </DialogHeader>
        <DialogDescription>
          Você não podera desfazer essa ação
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={'outline'} className="mt-4 md:mt-0">
              Cancelar
            </Button>
          </DialogClose>
          <FormDeleteTask taskId={task.id} listId={listId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
