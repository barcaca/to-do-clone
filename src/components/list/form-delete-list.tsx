'use client'
import { useRouter } from 'next/navigation'

import { deleteList } from '@/actions/list/delete-list'
import { customToast } from '@/lib/utils/custom-toast'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface FormDeleteListProps {
  id: string | undefined
}
export function FormDeleteList({ id }: FormDeleteListProps) {
  const router = useRouter()
  async function handleDeleteAction(formData: FormData) {
    const res = await deleteList(formData)
    customToast(res?.status, res?.message)
    if (res.status === 200) router.push('/tasks/meudia')
  }

  return (
    <form action={handleDeleteAction}>
      <Input type="hidden" value={id} name="id" />
      <Button
        type="submit"
        variant={'destructive'}
        title="Deletar Lista"
        className="w-full "
      >
        Confirmar
      </Button>
    </form>
  )
}
