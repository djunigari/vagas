import {
  create,
  getUsers,
  remove,
  update,
  userAccess,
} from '@/controllers/user.controller'
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

usersRouter.post('/users', create)
usersRouter.get('/users', getUsers)
usersRouter.put('/users', middleware, update)
usersRouter.delete('/users', middleware, remove)
usersRouter.get('/users/access', userAccess)
