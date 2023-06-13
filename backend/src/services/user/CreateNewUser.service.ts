import { User } from '@/model/User'
import { IUserRepository } from '@/repositories/IUserRepository'

class CreateNewUserService {
  constructor(private repo: IUserRepository) {}

  async execute(name: string, job: string) {
    if (!name.trim()) throw new Error("User's name can not be empty or blank")

    const userAlreadyExists = await this.repo.exists(name)

    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const newUser = new User(name, job)

    return this.repo.create(newUser)
  }
}

export { CreateNewUserService }
