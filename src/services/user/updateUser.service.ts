import { User } from '@/model/User'

export const updateUser = (user: User, newName: string, newJob: string) => {
  user.name = newName
  user.job = newJob

  return user
}
