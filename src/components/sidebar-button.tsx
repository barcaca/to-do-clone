'use client'
import { MenuIcon } from 'lucide-react'

import { useSidebarContext } from '@/contexts/sidebar'

import { Button } from './ui/button'
interface SidebarButtonProps {
  isSidebarClose?: boolean
}
export function SidebarButton({ isSidebarClose }: SidebarButtonProps) {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext()
  const sideBarClose = isSidebarClose === isSidebarOpen
  function handleToggle() {
    toggleSidebar()
  }
  return (
    <>
      <Button
        className={sideBarClose ? '' : 'hidden'}
        variant={'ghost'}
        size={'icon'}
        aria-label="Ativar/Desativar Sidebar"
        onClick={handleToggle}
      >
        <MenuIcon />
      </Button>
    </>
  )
}
