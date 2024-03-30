'use client'
import { CalendarDaysIcon, HomeIcon, StarIcon, SunIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { SideBarItem } from '@/components/sidebar-item'
import { Separator } from '@/components/ui/separator'
import { useSidebarContext } from '@/contexts/sidebar'

import { FormCreateList } from './form/form-create-list'
import { SidebarButton } from './sidebar-button'

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
export function SideBar({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useSidebarContext()

  return (
    <>
      <aside
        id="logo-sidebar"
        className="hidden h-full w-64 -translate-x-full border-r pt-6 transition-transform data-[collapsed=true]:hidden data-[collapsed=true]:-translate-x-full md:block md:translate-x-0"
        aria-label="Sidebar"
        data-collapsed={isSidebarOpen}
      >
        <div className="h-full space-y-2 overflow-y-auto pb-4">
          <ul className="space-y-2 font-medium">
            <div className="px-2">
              <SidebarButton isSidebarClose={!!isSidebarOpen} />
            </div>
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
      </aside>
    </>
  )
}
