'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center">
      <h2 className="text-center">Alguma coisa deu errado!</h2>
      <Button variant={'destructive'} onClick={() => reset()}>
        Tente Novamente
      </Button>
    </main>
  )
}
