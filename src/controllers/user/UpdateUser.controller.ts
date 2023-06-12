import { User } from '@/model/User'
import { UpdateUserService } from '@/services/user/UpdateUser.service'
import { Request, Response } from 'express'

class UpdateUserController {
  constructor(private updateUser: UpdateUserService) {}

  async handle(req: Request, res: Response) {
    const id = parseInt(req.body.id as string)
    const name = (req.body.name as string)?.replace(/\s+/g, ' ').trim()
    const job = (req.body.job as string)?.replace(/\s+/g, ' ').trim()

    try {
      const updatedUser = await this.updateUser.execute(id, {
        name,
        job,
      } as User)
      return res.status(200).send(updatedUser)
    } catch (error: any) {
      return res.status(400).send({ message: error.message })
    }
  }
}

export { UpdateUserController }
