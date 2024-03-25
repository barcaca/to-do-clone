import { Metadata } from 'next'

import { SignIn } from '@/components/sign-in'

export const metadata: Metadata = {
  title: 'Entrar',
}
export default function SignInPage() {
  return (
    <div className="h-screen">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-6">
        <SignIn />
      </div>
    </div>
  )
}
