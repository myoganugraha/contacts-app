import api, { handleError } from '@/Services'

export default async (data) => {
  if (!data.firstName && !data.lastName && !data.age) {
    return handleError({ message: 'incomplete data, please try again' })
  }
  let payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    photo: data.photo
  }
  const response = await api.post(``, payload)
  return response.data
}