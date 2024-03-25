import { CircleDashedIcon } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <CircleDashedIcon
        size={96}
        className="animate-spin text-muted-foreground"
      />
      <p>Carregando</p>
    </div>
  )
}
