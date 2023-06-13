import { User } from '@/model/User'
import { IUserRepository } from '@/repositories/IUserRepository'
import { UsersRepositoryInMemory } from '@/repositories/in-memory/UsersRepositoryInMemory'
import { FindUserByNameService } from './FindUserByName.service'

describe('Find User by name Service', () => {
  let repo: IUserRepository
  let findUserByName: FindUserByNameService

  beforeEach(() => {
    repo = new UsersRepositoryInMemory()
    findUserByName = new FindUserByNameService(repo)
  })

  it('should find user by name', async () => {
    const user = await repo.create({ name: 'test', job: 'test job' } as User)

    const founded = await findUserByName.execute('test')

    expect(founded?.id).toBe(2)
    expect(founded?.name).toBe('test')
    expect(founded?.job).toBe('test job')
    expect(founded?.views).toBe(1)
  })

  it('should not find user', async () => {
    await expect(findUserByName.execute('test')).rejects.toThrow(
      Error('User not found'),
    )
  })
})
