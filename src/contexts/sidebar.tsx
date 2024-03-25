'use client'
import { createContext, ReactNode, useContext, useState } from 'react'

interface SidebarType {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext({} as SidebarType)

interface SidebarProviderProps {
  children: ReactNode
}
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar() {
    setIsSidebarOpen((prevState) => !prevState)
  }
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => useContext(SidebarContext)
