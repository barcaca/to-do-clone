import { Metadata } from 'next'

import { SignUp } from '@/components/sign-up'

export const metadata: Metadata = {
  title: 'Cadastro',
}
export default function SignUpPage() {
  return (
    <div className="h-screen">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-6">
        <SignUp />
      </div>
    </div>
  )
}
