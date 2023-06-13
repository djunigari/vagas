import { User } from '@/model/User'
import { IUserRepository } from '@/repositories/IUserRepository'
import { UsersRepositoryInMemory } from '@/repositories/in-memory/UsersRepositoryInMemory'
import { UpdateUserService } from './UpdateUser.service'

describe('Update user Service', () => {
  let repo: IUserRepository
  let updateUser: UpdateUserService

  beforeEach(() => {
    repo = new UsersRepositoryInMemory()

    updateUser = new UpdateUserService(repo)
  })

  it('should update user', async () => {
    const userData = { name: 'new name', job: 'new job' } as User

    await repo.create({ name: 'test', job: 'test job' } as User)

    const updatedUser = await updateUser.execute(2, userData)

    expect(updatedUser.id).toBe(2)
    expect(updatedUser.name).toBe('new name')
    expect(updatedUser.job).toBe('new job')
    expect(updatedUser.views).toBe(0)

    const founded = await repo.findById(2)
    expect(founded?.id).toBe(2)
    expect(founded?.name).toBe('new name')
    expect(founded?.job).toBe('new job')
    expect(founded?.views).toBe(0)
  })

  it('should update only user name', async () => {
    const userData = { name: 'new name', job: 'test job' } as User
    await repo.create({ name: 'test', job: 'test job' } as User)

    const updatedUser = await updateUser.execute(2, userData)
    expect(updatedUser.id).toBe(2)
    expect(updatedUser.name).toBe('new name')
    expect(updatedUser.job).toBe('test job')
    expect(updatedUser.views).toBe(0)

    const founded = await repo.findById(2)
    expect(founded?.id).toBe(2)
    expect(founded?.name).toBe('new name')
    expect(founded?.job).toBe('test job')
    expect(founded?.views).toBe(0)
  })

  it('should update only user job', async () => {
    const userData = { name: 'test name', job: 'new job' } as User
    await repo.create({ name: 'test', job: 'test job' } as User)

    const updatedUser = await updateUser.execute(2, userData)

    expect(updatedUser.id).toBe(2)
    expect(updatedUser.name).toBe('test name')
    expect(updatedUser.job).toBe('new job')
    expect(updatedUser.views).toBe(0)

    const founded = await repo.findById(2)
    expect(founded?.id).toBe(2)
    expect(founded?.name).toBe('test name')
    expect(founded?.job).toBe('new job')
    expect(founded?.views).toBe(0)
  })

  it('should not update user with invalid id', async () => {
    const userData = { name: 'test name', job: 'new job' } as User
    await expect(updateUser.execute(2, userData)).rejects.toThrow(
      Error('User not found'),
    )
  })
})
