import { Metadata } from 'next'
import Link from 'next/link'

import { Features } from '@/components/features'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div className="h-screen">
      <section className="space-y-6 pb-4 pt-6 md:pb-8 md:pt-10 ">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            To Do Clone
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            O To Do Clone possibilita que você tenha mais foco, do trabalho ao
            lazer.
          </p>
          <div className="grid grid-cols-2 space-x-4">
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              Iniciar
            </Link>
            <Link
              href={'/'}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'gap-1',
              )}
            >
              <Icons.gitHub className="size-6 fill-current" />
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section className="container space-y-6 py-4 dark:bg-transparent md:py-8">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Características
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Inspirado na Microsoft To Do, este projeto é um laboratório prático
            para explorar como uma aplicação moderna, completa com autenticação,
            assinaturas, rotas de API e páginas estáticas,
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Features />
        </div>
      </section>
    </div>
  )
}
