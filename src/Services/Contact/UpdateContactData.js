import api, { handleError } from '@/Services'

export default async (payload) => {
  const response = await api.put(`/${payload.id}`, payload.newData)
  return response.data
}