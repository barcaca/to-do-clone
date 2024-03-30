import { Metadata } from 'next'
import Link from 'next/link'

import { SignUp } from '@/components/sign-up'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Cadastro',
}
export default function SignUpPage() {
  return (
    <div className="h-screen">
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
        <SignUp />
      </div>
    </div>
  )
}
