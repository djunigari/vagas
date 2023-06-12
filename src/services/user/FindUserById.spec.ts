import { User } from '@/model/User'
import { IUserRepository } from '@/repositories/IUserRepository'
import { UsersRepositoryInMemory } from '@/repositories/in-memory/UsersRepositoryInMemory'
import { FindUserByIdService } from './FindUserById.service'

describe('Find user by id Service', () => {
  let repo: IUserRepository
  let findUserById: FindUserByIdService
  beforeEach(() => {
    repo = new UsersRepositoryInMemory()
    findUserById = new FindUserByIdService(repo)
  })

  it('should find user by id', async () => {
    await repo.create({ name: 'test', job: 'test job' } as User)

    const founded = await findUserById.execute(2)

    expect(founded?.id).toBe(2)
    expect(founded?.name).toBe('test')
    expect(founded?.job).toBe('test job')
    expect(founded?.views).toBe(1)
  })

  it('should not find user', async () => {
    const founded = await findUserById.execute(2)

    expect(founded).toBeNull()
  })
})
