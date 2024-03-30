import {
  CalendarDaysIcon,
  HomeIcon,
  MenuIcon,
  StarIcon,
  SunIcon,
} from 'lucide-react'
import { ReactNode } from 'react'

import { FormCreateList } from './list/form-create-list'
import { SideBarItem } from './sidebar-item'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const sidebarItems = [
  {
    href: 'meudia',
    icon: <SunIcon />,
    label: 'Meu Dia',
  },
  {
    href: 'importante',
    icon: <StarIcon />,
    label: 'Importante',
  },
  {
    href: 'planejado',
    icon: <CalendarDaysIcon />,
    label: 'Planejado',
  },
  {
    href: 'tarefas',
    icon: <HomeIcon />,
    label: 'Tarefas',
  },
]
export function SidebarMobile({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="md:hidden"
          variant={'ghost'}
          size={'icon'}
          aria-label="Ativar/Desativar Sidebar"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0">
        <div className="h-full space-y-2 overflow-y-auto pt-10">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item) => {
              return (
                <SideBarItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              )
            })}
            <Separator />
          </ul>
          {children}
          <FormCreateList />
        </div>
      </SheetContent>
    </Sheet>
  )
}
