import { generateAccessToken } from '@/services/auth/generateAccessToken'
import { Request, Response } from 'express'

export function signin(req: Request, res: Response) {
  const { username } = req.body
  if (!username) return res.status(401).send('Bad Request')

  const token = generateAccessToken(username as string)
  res.json(token)
}
