import cors from 'cors'
import express from 'express'
import { signinRouter } from './routes/signin.routes'
import { userRouter } from './routes/user.routes'
import { usersRouter } from './routes/users.routes'

const app = express()

app.use(cors({ origin: 'http://localhost:8080' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRouter)
app.use(usersRouter)
app.use(signinRouter)

export { app }
