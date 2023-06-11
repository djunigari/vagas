import { User } from '@/fakeData'

export const updateUser = (user: User, newName: string, newJob: string) => {
  user.name = newName
  user.job = newJob

  return user
}
