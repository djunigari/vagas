import express from 'express'
import { signin } from './controllers/auth.controller'
import {
  create,
  getUser,
  getUsers,
  remove,
  update,
  userAccess,
} from './controllers/user.controller'
import { isAuthenticated } from './services/auth/generateAccessToken'
const router = express.Router()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 3000

router.put('/users', (req, res, next) => {
  const payload = isAuthenticated(req)
  if (!payload) return res.status(401).send('User Unauthorized')
  next()
})

router.delete('/users', (req, res, next) => {
  const payload = isAuthenticated(req)
  if (!payload) return res.status(401).send('User Unauthorized')
  next()
})

app.post('/users', create)
app.get('/user', getUser)
app.get('/users', getUsers)
app.put('/users', router, update)
app.delete('/users', router, remove)
app.get('/users/access', userAccess)

app.get('/signin', (req, res, next) => {
  res.send(`<form method="POST" action="/signin">
  <input type="text" name="username" placeholder="username">
  <input type="submit">
</form>`)
})

app.post('/signin', signin)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
