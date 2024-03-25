import { CheckCircle2Icon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Home',
}
export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div>
        <CheckCircle2Icon className="mx-auto mb-2 text-primary" size={120} />
        <h1 className="text-center text-4xl font-bold">To Do Clone</h1>
        <p className="mt-4 max-w-[354px] text-center text-lg">
          O To Do Clone possibilita que você tenha mais foco, do trabalho ao
          lazer.
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <Link
          href={'/sign-up'}
          className={cn(buttonVariants(), 'px-11 py-3 shadow-md')}
        >
          Cadastrar
        </Link>
        <Link href={'/sign-in'} className={buttonVariants()}>
          Entrar
        </Link>
      </div>
    </div>
  )
}
