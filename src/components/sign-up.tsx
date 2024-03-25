import { CheckCircle2Icon } from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { UserAuthProviders } from './user-auth-providers'

export function SignUp() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-4 text-2xl">
          <CheckCircle2Icon className="text-primary" size={32} />
          To Do Clone
        </CardTitle>
        <CardDescription>
          Cadastre com seu email abaixo usando uma das contas
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <UserAuthProviders />
      </CardContent>
      <CardFooter className="grid gap-4">
        <p className="mx-auto max-w-xs text-center text-sm">
          Ao continuar, você está configurando uma conta To Do Clone e concorda
          com nosso Contrato de Usuário e Política de Privacidade
        </p>
        <p className="px-8 text-center text-sm text-foreground">
          Já tem conta To Do Clone?{' '}
          <Link
            href={'/sign-in'}
            className="text-sm underline underline-offset-4 hover:text-muted-foreground"
          >
            Entrar
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
