import { UsersRepositoryInMemory } from '@/repositories/in-memory/UsersRepositoryInMemory'
import { CreateNewUserService } from './CreateNewUser.service'

describe('Create user Service', () => {
  let createNewUser: CreateNewUserService

  beforeEach(() => {
    const repo = new UsersRepositoryInMemory()
    createNewUser = new CreateNewUserService(repo)
  })

  it('should be able to create a new user', async () => {
    const user = await createNewUser.execute('test', 'job test')

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('test')
    expect(user.job).toBe('job test')
    expect(user.views).toBe(0)
  })

  it('should not be able to create an user with empty name  ', async () => {
    await expect(createNewUser.execute('', 'job test')).rejects.toThrow(
      Error("User's name can not be empty or blank"),
    )
  })

  it('should not be able to create an existing user ', async () => {
    await createNewUser.execute('test', 'job test')

    await expect(createNewUser.execute('test', 'job test')).rejects.toThrow(
      Error('User already exists!'),
    )
  })
})
