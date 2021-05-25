import api, { handleError } from '@/Services'

export default async () => {
  const response = await api.get()
  return response.data
}