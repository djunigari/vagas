import { UsersRepositoryInMemory } from '@/repositories/in-memory/UsersRepositoryInMemory'
import { CreateNewUserService } from '@/services/user/CreateNewUser.service'
import { DeleteUserService } from '@/services/user/DeleteUser.service'
import { FindUserByNameService } from '@/services/user/FindUserByName.service'
import { GetAllUsersService } from '@/services/user/GetAllUsers.service'
import { GetUserAcessService } from '@/services/user/GetUserAcess.service'
import { UpdateUserService } from '@/services/user/UpdateUser.service'
import { CreateUserController } from './user/CreateUser.controller'
import { DeleteUserController } from './user/DeleteUser.controller'
import { GetUserController } from './user/GetUser.controller'
import { GetUsersController } from './user/GetUsers.controller'
import { UpdateUserController } from './user/UpdateUser.controller'
import { UserAccessController } from './user/UserAccess.controller'

const repo = new UsersRepositoryInMemory()

const createUserFactory = () => {
  const service = new CreateNewUserService(repo)
  const controller = new CreateUserController(service)
  return controller
}

const updateUserFactory = () => {
  const service = new UpdateUserService(repo)
  const controller = new UpdateUserController(service)
  return controller
}

const deleteUserFactory = () => {
  const service = new DeleteUserService(repo)
  const controller = new DeleteUserController(service)
  return controller
}

const getUserFactory = () => {
  const service = new FindUserByNameService(repo)
  const controller = new GetUserController(service)
  return controller
}

const getUsersFactory = () => {
  const service = new GetAllUsersService(repo)
  const controller = new GetUsersController(service)
  return controller
}

const userAccessFactory = () => {
  const service = new GetUserAcessService(repo)
  const controller = new UserAccessController(service)
  return controller
}

export {
  createUserFactory,
  deleteUserFactory,
  getUserFactory,
  getUsersFactory,
  updateUserFactory,
  userAccessFactory,
}
