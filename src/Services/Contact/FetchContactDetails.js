import api, { handleError } from '@/Services'

export default async (id) => {
  const response = await api.get(`/${id}`)
  return response.data
}