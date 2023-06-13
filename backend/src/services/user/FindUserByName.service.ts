import { IUserRepository } from '@/repositories/IUserRepository'

class FindUserByNameService {
  constructor(private repo: IUserRepository) {}

  async execute(name: string) {
    const founded = await this.repo.findByName(name)
    if (!founded) throw new Error('User not found')
    await this.repo.addView(founded)
    return founded
  }
}

export { FindUserByNameService }
