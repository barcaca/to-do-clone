'use client'
import { PlusIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'

import { createList } from '@/actions/list/create-list'
import { cn } from '@/lib/utils'
import { customToast } from '@/lib/utils/custom-toast'

import { Button, buttonVariants } from '../ui/button'
import { Input } from '../ui/input'

export function FormCreateList() {
  const [input, setInput] = useState<string>('')

  const isEmptyInput = input && input.trim() !== ''

  async function handleCreateList(formData: FormData) {
    const res = await createList(formData)
    customToast(res?.status, res?.message)
    if (res.status === 200 && res.url) {
      setInput('')
      redirect(res.url)
    }
  }

  return (
    <form
      action={handleCreateList}
      className="flex flex-col font-medium"
      aria-describedby="form-error"
      onSubmit={() => setInput('')}
    >
      <div
        className={cn(buttonVariants({ variant: 'ghost' }), 'rounded-none p-2')}
      >
        <Button
          type="submit"
          size={'icon'}
          variant={'ghost'}
          title="Criar Lista"
          className="text-primary"
          disabled={!isEmptyInput}
        >
          <PlusIcon />
        </Button>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="Nova Tarefa"
          className="border-0 ring-0 placeholder:text-primary hover:bg-inherit focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-describedby="title-error"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {/* <div
        id="title-error"
        aria-live="polite"
        aria-atomic="true"
        className="px-4"
      >
        {state?.errors?.title &&
          state?.errors.title.map((error: string) => {
            return (
              <p className="mt-2 text-sm text-destructive" key={error}>
                {error}
              </p>
            )
          })}
      </div> */}
    </form>
  )
}
