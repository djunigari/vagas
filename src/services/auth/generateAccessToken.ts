import dotenv from 'dotenv'
import { Request } from 'express'
import jwt from 'jsonwebtoken'

dotenv.config()

export function generateAccessToken(username: string) {
  const payload = { username: username }
  const token = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: `${10 * 60}s`,
  })
  return { token }
}

export function isAuthenticated(req: Request) {
  const authHeader = req.headers['authorization'] as string
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return null

  return jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) {
        console.log(err)
        return null
      } else {
        return decoded
      }
    },
  )
}
