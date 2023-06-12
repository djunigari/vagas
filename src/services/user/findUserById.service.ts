import { IUserRepository } from '@/repositories/IUserRepository'

class FindUserByIdService {
  constructor(private repo: IUserRepository) {}

  async execute(id: number) {
    const founded = await this.repo.findById(id)
    if (founded) this.repo.addView(founded)
    return founded
  }
}

export { FindUserByIdService }
