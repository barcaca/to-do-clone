import { ReactNode } from 'react'

import { SideBar } from '@/components/sidebar'
import { SidebarUserItem } from '@/components/sidebar-user-item'
import { SidebarProvider } from '@/contexts/sidebar'

export default function LayoutTasks({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex overflow-hidden">
      <SidebarProvider>
        <SideBar>
          <SidebarUserItem />
        </SideBar>
        <main className="flex-1 space-y-6 overflow-y-auto overscroll-contain p-6">
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}
