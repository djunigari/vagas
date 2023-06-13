import { User } from '@/model/User'
import { IUserRepository } from '@/repositories/IUserRepository'

class UpdateUserService {
  constructor(private repo: IUserRepository) {}

  async execute(id: number, userData: User) {
    const founded = await this.repo.findById(id)
    if (!founded) throw new Error('User not found')

    return this.repo.update(founded, userData)
  }
}

export { UpdateUserService }
