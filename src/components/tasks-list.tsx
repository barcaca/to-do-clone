'use client'
import { Task } from '@prisma/client'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { TasksItem } from './tasks-item'
import { Button } from './ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { Separator } from './ui/separator'

interface TasksListProps {
  tasks: Task[]
  nameList: string
}
export function TasksList({ tasks, nameList }: TasksListProps) {
  const [isOpen, setIsOpen] = useState(false)
  if (!tasks) {
    return null
  }
  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)
  return (
    <div className="space-y-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        {tasks.map((task) => {
          return (
            <>
              {!task.completed && (
                <TasksItem key={task.id} task={task} listId={nameList} />
              )}
            </>
          )
        })}
        {completedTasks.length > 0 && (
          <>
            <CollapsibleTrigger asChild>
              <Button
                variant={'ghost'}
                className="flex w-full items-center justify-start gap-2 "
              >
                <ChevronRight
                  size={20}
                  className="rotate-0 transition-all data-[state=true]:rotate-90"
                  data-state={isOpen}
                />
                <span className="flex items-center gap-4 font-semibold">
                  Concluída{' '}
                  <span className="text-muted-foreground">
                    {completedTasks.length}
                  </span>
                </span>
              </Button>
            </CollapsibleTrigger>
            <Separator
              className="opacity-100 transition-opacity duration-500 ease-in-out data-[state=true]:opacity-0"
              data-state={isOpen}
            />
            <CollapsibleContent
              className="animate-accordion-up space-y-2 data-[state=true]:animate-accordion-down"
              data-state={isOpen}
            >
              {tasks.map((task) => {
                return (
                  <>
                    {task.completed && (
                      <TasksItem key={task.id} task={task} listId={nameList} />
                    )}
                  </>
                )
              })}
            </CollapsibleContent>
          </>
        )}
      </Collapsible>
      {/* {pendingTasks.map((task) => {
        return <TasksItem task={task} key={task.id} />
      })}
      {completedTasks.length > 0 && (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant={'ghost'}
              className="flex w-full items-center justify-start gap-2 "
            >
              <ChevronRight
                size={20}
                className="rotate-0 transition-all data-[state=true]:rotate-90"
                data-state={isOpen}
              />
              <span className="flex items-center gap-4 font-semibold">
                Concluída{' '}
                <span className="text-muted-foreground">
                  {completedTasks.length}
                </span>
              </span>
            </Button>
          </CollapsibleTrigger>
          <Separator
            className="opacity-100 transition-opacity duration-500 ease-in-out data-[state=true]:opacity-0"
            data-state={isOpen}
          />
          {completedTasks.map((task) => (
            <CollapsibleContent
              key={task.id}
              className="animate-accordion-up space-y-2 overflow-hidden transition-all duration-200 data-[state=true]:animate-accordion-down"
              data-state={isOpen}
            >
              <TasksItem task={task} />
            </CollapsibleContent>
          ))}
        </Collapsible>
      )} */}
    </div>
  )
}
