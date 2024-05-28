import { UserType } from '@/types/models'
import { fetcher } from '@/api/lib/fetcher'

export const getUsers = async (): Promise<UserType[] | null> => {
  return (await fetcher.get('/users')).data?.data ?? null
}

export const getUser = async (params: {
  userId: string
}): Promise<UserType | null> => {
  return (await fetcher.get(`/users/${params.userId}`)).data?.data ?? null
}

// TODO: type data using yup schema type
export const createUser = async (data: any): Promise<UserType | null> => {
  return (await fetcher.post('/users', data)).data?.data ?? null
}

// TODO: type data using yup schema type
export const updateUser = async (data: any): Promise<UserType | null> => {
  return (await fetcher.put(`/users/${data.id}`, data)).data?.data ?? null
}
