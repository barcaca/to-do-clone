import { CheckCircle2Icon } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { UserAuthProviders } from './user-auth-providers'
import { UserAvatar } from './user-avatar'

export async function SignIn() {
  const session = await getServerSession()
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-4 text-2xl">
          <CheckCircle2Icon className="text-primary" size={32} />
          To Do Clone
        </CardTitle>
        <CardDescription>
          Entre com seu email abaixo usando uma das contas
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <UserAuthProviders />
        {session && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>
            <Link
              href={'/tasks/meudia'}
              className=" flex items-center space-x-4 rounded-md border p-4 hover:bg-muted"
            >
              <div className="flex flex-1 items-center gap-4">
                <UserAvatar
                  user={{
                    name: session?.user.name || null,
                    image: session?.user.image || null,
                  }}
                />
                <div>
                  <h1>{session?.user.email}</h1>
                  <p className="text-muted-foreground">{session?.user.name}</p>
                </div>
              </div>
            </Link>
          </>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
