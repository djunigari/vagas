import { signin } from '@/controllers/auth.controller'
import { Router } from 'express'

export const signinRouter = Router()

signinRouter.get('/signin', (req, res, next) => {
  res.send(`<form method="POST" action="/signin">
  <input type="text" name="username" placeholder="username">
  <input type="submit">
</form>`)
})

signinRouter.post('/signin', signin)
