import { Metadata } from 'next'
import Link from 'next/link'

import { SignIn } from '@/components/sign-in'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Entrar',
}
export default function SignInPage() {
  return (
    <div className="relative h-screen">
      <Link
        href={'/'}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'absolute left-2 top-2',
        )}
      >
        Voltar
      </Link>
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-6">
        <SignIn />
      </div>
    </div>
  )
}
