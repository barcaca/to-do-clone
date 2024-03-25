import { CheckCircle2Icon, CircleUserRoundIcon } from 'lucide-react'
import Link from 'next/link'
import { User } from 'next-auth'

import { getAuthSession } from '@/lib/auth'
import { cn } from '@/lib/utils'

import { ModeToggle } from './theme-mode-toggle'
import { buttonVariants } from './ui/button'
import { UserAccountNav } from './user-account-nav'

export async function NavBar() {
  const session = await getAuthSession()
  return (
    <nav className="z-50 w-full border-b">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link href="/" className="mx-2 flex items-center md:me-24">
              <CheckCircle2Icon size={24} className="mr-2 text-primary" />
              <span className="self-center text-xl font-semibold sm:text-2xl">
                To Do Clone
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="container flex items-center">
              <div className="flex items-center space-x-4">
                {session ? (
                  <UserAccountNav user={session.user as User} />
                ) : (
                  <Link
                    href={'/sign-in'}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'gap-4',
                    )}
                  >
                    Entrar
                    <CircleUserRoundIcon className="text-primary" />
                  </Link>
                )}
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
