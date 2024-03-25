import { EllipsisIcon, TextCursorInputIcon, Trash2Icon } from 'lucide-react'

import { SidebarButton } from '@/components/sidebar-button'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { FormDeleteList } from './form/form-delete-list'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarUserItem } from './sidebar-user-item'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog'

interface ListHeaderMenuProps {
  listName: string
  listId?: string
  isListCreated?: boolean
}
export function ListHeaderMenu({
  listName,
  listId,
  isListCreated,
}: ListHeaderMenuProps) {
  return (
    <div className="flex items-center space-x-1 px-1 py-6">
      <SidebarMobile>
        <SidebarUserItem />
      </SidebarMobile>
      <SidebarButton isSidebarClose={true} />
      <h1 className="pl-4 text-xl font-bold text-primary">{listName}</h1>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 px-0">
            <DropdownMenuLabel className="text-center">
              Opções de Lista
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isListCreated && (
              <>
                <DropdownMenuItem className="flex gap-2 px-4 hover:bg-muted">
                  <TextCursorInputIcon strokeWidth={1} />
                  Renomear lista
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem className="flex gap-2 px-4 text-destructive hover:bg-muted">
                    <Trash2Icon strokeWidth={1} />
                    Excluir lista
                  </DropdownMenuItem>
                </DialogTrigger>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader className="font-semibold">
            &ldquo;{listName}&ldquo; será definitivamente excluída.
          </DialogHeader>
          <DialogDescription>
            Você não podera desfazer essa ação
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant={'outline'}
                className="mt-4 md:mt-0"
              >
                Cancelar
              </Button>
            </DialogClose>
            <FormDeleteList id={listId} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
