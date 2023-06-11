import { list } from '@/data/fakeData'

export const deleteUser = (name: string) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) {
      const founded = list[i]
      list.splice(i, 1)
      return founded
    }
  }
  return null
}
