import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { ThemeProvider } from '@/components/theme-provider'
import ToastProvider from '@/components/toaster-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | To Do Clone',
    default: 'To Do Clone',
  },
  description:
    'To Do Clone é um aplicativo de gerenciamento de tarefas que ajuda você a se manter organizado e produtivo. ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex h-screen w-full flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <ToastProvider>{children}</ToastProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
