import api, { handleError } from '@/Services'

export default async (value) => {
  let payload = {
    firstName: value.firstName,
    lastName: value.lastName,
    age: value.age,
    photo: value.photo
  }
  const response = await api.post(``, payload)
  return response.data
}