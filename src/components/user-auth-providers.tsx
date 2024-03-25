'use client'
import { signIn } from 'next-auth/react'

import { Icons } from './icons'
import { Button } from './ui/button'

export function UserAuthProviders() {
  async function handleLoginWithOAuth(provider: 'github' | 'google') {
    try {
      await signIn(provider, {
        callbackUrl: `${window.location.origin}/tasks/meudia`,
      })
    } catch (error) {}
  }
  return (
    <div className="grid gap-6">
      <Button
        variant="outline"
        className="py-6 hover:bg-primary"
        onClick={() => handleLoginWithOAuth('github')}
      >
        <Icons.gitHub className="mr-2 size-4" />
        Github
      </Button>
      <Button
        variant="outline"
        className="py-6 hover:bg-primary"
        onClick={() => handleLoginWithOAuth('google')}
      >
        <Icons.google className="mr-2 size-4" />
        Google
      </Button>
    </div>
  )
}
