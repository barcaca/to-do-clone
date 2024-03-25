import { ReactNode } from 'react'

import { SideBar } from '@/components/sidebar'
import { SidebarUserItem } from '@/components/sidebar-user-item'
import { SidebarProvider } from '@/contexts/sidebar'

export default function LayoutTasks({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full">
      <SidebarProvider>
        <SideBar>
          <SidebarUserItem />
        </SideBar>
        {children}
      </SidebarProvider>
    </div>
  )
}
