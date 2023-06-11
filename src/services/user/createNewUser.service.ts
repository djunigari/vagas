import { User, list } from '@/fakeData'

export const createNewUser = (name: string, job: string) => {
  const newUser = new User(name, job)

  list.push(newUser)

  return newUser
}
