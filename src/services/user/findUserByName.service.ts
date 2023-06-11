import { list } from '@/data/fakeData'

export const findUserByName = (name: string) => {
  return list.find((user) => user.name === name)
}
