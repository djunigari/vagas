import { User } from '@/model/User'
import { IUserRepository } from '@/repositories/IUserRepository'
import { UsersRepositoryInMemory } from '@/repositories/in-memory/UsersRepositoryInMemory'
import { DeleteUserService } from './DeleteUser.service'

describe('Delete user Service', () => {
  let repo: IUserRepository
  let deleteUser: DeleteUserService

  beforeEach(() => {
    repo = new UsersRepositoryInMemory()

    deleteUser = new DeleteUserService(repo)
  })

  it('should delete user', async () => {
    const user = await repo.create({ name: 'test', job: 'job test' } as User)

    const deletedUser = await deleteUser.execute('test')

    expect(deletedUser?.id).toBe(2)
  })

  it('should not delete user with invalid name', async () => {
    await expect(deleteUser.execute('test')).rejects.toThrow(
      Error('User not found'),
    )
  })
})
