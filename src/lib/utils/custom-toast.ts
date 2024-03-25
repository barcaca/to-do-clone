import toast from 'react-hot-toast'

export function customToast(
  status: number | undefined,
  message: string | null | undefined,
) {
  if (status === 500 || status === 400) {
    toast.error(message || 'Error')
  } else if (status === 200) {
    toast.success(message || 'Success')
  } else {
    toast.error('Erro inesperado')
  }
}
