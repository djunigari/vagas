import { User } from '@/model/User'

interface IUserRepository {
  create: (newUser: User) => Promise<User>
  update: (user: User, userData: User) => Promise<User>
  remove: (user: User) => Promise<User | null>
  exists: (name: string) => Promise<boolean>
  addView: (user: User) => Promise<User>
  findById: (id: number) => Promise<User | null>
  findByName: (name: string) => Promise<User | null>
  getAll: () => Promise<User[]>
}

export { IUserRepository }
