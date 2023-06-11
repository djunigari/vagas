import { getUser } from '@/controllers/user.controller'
import { Router } from 'express'
export const userRouter = Router()

userRouter.get('/user', getUser)
