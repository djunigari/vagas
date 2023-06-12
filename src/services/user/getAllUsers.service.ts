import { IUserRepository } from '@/repositories/IUserRepository'

class GetAllUsersService {
  constructor(private repo: IUserRepository) {}

  async execute() {
    return this.repo.getAll()
  }
}

export { GetAllUsersService }
