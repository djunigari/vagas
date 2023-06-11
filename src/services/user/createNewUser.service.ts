import { list } from '@/data/fakeData'
import { User } from '@/model/User'

export const createNewUser = (name: string, job: string) => {
  const newUser = new User(name, job)

  list.push(newUser)

  return newUser
}
