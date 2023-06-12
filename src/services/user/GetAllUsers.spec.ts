import { UsersRepositoryInMemory } from '@/repositories/in-memory/UsersRepositoryInMemory'
import { GetAllUsersService } from './GetAllUsers.service'

describe('Get All users Service', () => {
  it('shoulg get all users', async () => {
    const repo = new UsersRepositoryInMemory()
    const getAllUsers = new GetAllUsersService(repo)

    const list = await getAllUsers.execute()

    expect(list.length).toBe(1)
  })
})
