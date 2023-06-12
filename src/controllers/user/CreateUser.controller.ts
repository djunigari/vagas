import { CreateNewUserService } from '@/services/user/CreateNewUser.service'
import { Request, Response } from 'express'

class CreateUserController {
  constructor(private createUser: CreateNewUserService) {}

  async handle(req: Request, res: Response) {
    const name = (req.body.name as string)?.replace(/\s+/g, ' ').trim()
    const job = (req.body.job as string)?.replace(/\s+/g, ' ').trim()

    try {
      const user = await this.createUser.execute(name, job)
      return res.json(user)
    } catch (error: any) {
      return res.status(400).send({ message: error.message })
    }
  }
}

export { CreateUserController }
