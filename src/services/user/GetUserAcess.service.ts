import { IUserRepository } from '@/repositories/IUserRepository'

class GetUserAcessService {
  constructor(private repo: IUserRepository) {}

  async execute(name: string) {
    const founded = await this.repo.findByName(name)

    if (!founded) throw new Error('User not found')

    return founded
  }
}

export { GetUserAcessService }
