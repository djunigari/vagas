import { User } from '@/model/User'
import { IUserRepository } from '../IUserRepository'

class UsersRepositoryInMemory implements IUserRepository {
  private lastId = 0
  private list: User[] = []

  constructor() {
    this.lastId = 1
    this.list = [
      {
        id: 1,
        name: 'João Oliveira',
        job: 'Desenvolvedor',
        views: 0,
      },
    ]
  }

  generateUserId = () => {
    this.lastId++
    return this.lastId
  }

  async create(newUser: User): Promise<User> {
    newUser.id = this.generateUserId()
    newUser.views = 0
    this.list.push(newUser)
    return newUser
  }

  async update(user: User, userData: User): Promise<User> {
    user.name = userData.name
    user.job = userData.job
    return user
  }

  async remove(user: User): Promise<User | null> {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === user.id) {
        const founded = this.list[i]
        this.list.splice(i, 1)
        return founded
      }
    }
    return null
  }

  async exists(name: string): Promise<boolean> {
    const res = this.list.find((user) => user.name === name)
    if (res) return true
    return false
  }

  async addView(user: User): Promise<User> {
    user.views++
    return user
  }

  async findById(id: number): Promise<User | null> {
    return this.list.find((user) => user.id === id) || null
  }

  async findByName(name: string): Promise<User | null> {
    return this.list.find((user) => user.name === name) || null
  }

  async getAll() {
    return this.list
  }
}

export { UsersRepositoryInMemory }
