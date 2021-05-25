import api, { handleError } from '@/Services'

export default async (id) => {
  const response = await api.delete(`/${id}`)
  return response.data
}