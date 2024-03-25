'use client'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'

import { cn } from '@/lib/utils'

import { buttonVariants } from './ui/button'

interface SideBarItemProps {
  href: string
  icon?: ReactElement
  label: string
}
export function SideBarItem({ href, icon, label }: SideBarItemProps) {
  const pathname = usePathname()
  return (
    <li
      key={href}
      className={`flex before:h-10 before:w-1 before:scale-y-0 ${pathname === `/tasks/${href}` ? 'ease-out before:block before:scale-y-100 before:bg-red-500 before:transition-transform before:duration-500' : ''}`}
    >
      <Link
        href={`/tasks/${href}`}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          `flex w-full items-center rounded-none p-2`,
        )}
      >
        {icon || <MenuIcon />}
        <span className="ms-3 flex-1">{label}</span>
        <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-primary p-3 text-sm font-medium text-primary-foreground ">
          3
        </span>
      </Link>
    </li>
  )
}
