import { getUserListName } from '@/lib/data'

import { SideBarItem } from './sidebar-item'

export async function SidebarUserItem() {
  const list = await getUserListName()
  const isListTrue = list!.length > 0
  return (
    <>
      {isListTrue &&
        list?.map((item) => {
          const { id, name } = item
          return <SideBarItem key={id} href={id} label={name} />
        })}
    </>
  )
}
