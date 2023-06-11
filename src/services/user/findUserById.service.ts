import { list } from '@/fakeData'

export const findUserById = (id: number) => {
  return list.find((user) => user.id === id)
}
