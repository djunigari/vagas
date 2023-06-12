import { getUserFactory } from '@/controllers/UserControllerFactory'
import { Router } from 'express'
export const userRouter = Router()

userRouter.get('/user', (request, response) =>
  getUserFactory().handle(request, response),
)
