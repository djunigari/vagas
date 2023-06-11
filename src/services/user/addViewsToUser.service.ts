import { User } from '@/model/User'

export const addViewsToUser = (user: User) => {
  user.views++
}
