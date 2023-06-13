import { IUserRepository } from '@/repositories/IUserRepository'

class DeleteUserService {
  constructor(private repo: IUserRepository) {}

  async execute(name: string) {
    const founded = await this.repo.findByName(name)

    if (!founded) throw new Error('User not found')

    return this.repo.remove(founded)
  }
}

export { DeleteUserService }
