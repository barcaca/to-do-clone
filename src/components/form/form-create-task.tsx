'use client'
import { CircleIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { createTask } from '@/actions/create-task'
import { customToast } from '@/lib/utils/custom-toast'

import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

interface FormCreateTaskProps {
  listId: string
  listName: string
}

export function FormCreateTask({ listId, listName }: FormCreateTaskProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const isEmptyInput = input && input.trim() !== ''

  function toggleOpen() {
    setOpen((prevState) => !prevState)
  }

  async function handleCreateTask(formData: FormData) {
    const res = await createTask(formData)
    customToast(res?.status, res?.message)
    if (res.status === 200) {
      setInput('')
    }
  }

  return (
    <form action={handleCreateTask}>
      <Input type="hidden" value={listId} name="listId" />
      <Input type="hidden" value={listName} name="listName" />
      <Card className="overflow-hidden px-0">
        <CardContent className="relative flex items-center justify-center py-1">
          <CircleIcon
            className="absolute left-4 scale-100 opacity-100 transition-all duration-500 data-[transiton=false]:-rotate-90 data-[transiton=false]:scale-0 data-[transiton=false]:opacity-0"
            data-transiton={open}
          />
          <PlusIcon
            className="absolute left-4 scale-100 opacity-100 transition-all duration-500 data-[transiton=true]:-rotate-90 data-[transiton=true]:opacity-0"
            data-transiton={open}
          />
          <Input
            name="title"
            className="border-0 pl-6 ring-0 placeholder:text-primary  placeholder:focus:text-secondary-foreground focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-card"
            placeholder="Adicionar uma tarefa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={toggleOpen}
            onBlur={toggleOpen}
          />
        </CardContent>
        <CardFooter
          className="flex-col space-y-2 overflow-hidden bg-secondary p-0 px-0 pb-2 transition-all data-[collapsed=false]:hidden"
          data-collapsed={open}
        >
          <Separator />
          <Button
            type="submit"
            variant={'outline'}
            className="ml-auto mr-4"
            disabled={!isEmptyInput}
          >
            Adicionar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
