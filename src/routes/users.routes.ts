import {
  createUserFactory,
  deleteUserFactory,
  getUsersFactory,
  updateUserFactory,
  userAccessFactory,
} from '@/controllers/UserControllerFactory'
import { isAuthenticated } from '@/services/auth/generateAccessToken'
import { Router } from 'express'

export const usersRouter = Router()
const middleware = Router()

middleware.put('/users', (req, res, next) => {
  const payload = isAuthenticated(req)
  if (!payload) return res.status(401).send('User Unauthorized')
  next()
})

middleware.delete('/users', (req, res, next) => {
  const payload = isAuthenticated(req)
  if (!payload) return res.status(401).send('User Unauthorized')
  next()
})

usersRouter.post('/users', (request, response) =>
  createUserFactory().handle(request, response),
)
usersRouter.get('/users', (request, response) =>
  getUsersFactory().handle(request, response),
)
usersRouter.put('/users', middleware, (request, response) =>
  updateUserFactory().handle(request, response),
)
usersRouter.delete('/users', middleware, (request, response) =>
  deleteUserFactory().handle(request, response),
)
usersRouter.get('/users/access', (request, response) =>
  userAccessFactory().handle(request, response),
)
