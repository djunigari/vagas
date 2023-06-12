import { DeleteUserService } from '@/services/user/DeleteUser.service'
import { Request, Response } from 'express'

class DeleteUserController {
  constructor(private deleteUser: DeleteUserService) {}

  async handle(req: Request, res: Response) {
    const name = (req.body.name as string)?.replace(/\s+/g, ' ').trim()

    try {
      const user = await this.deleteUser.execute(name)
      return res.status(200).send(user)
    } catch (error: any) {
      return res.status(400).send({ message: error.message })
    }
  }
}

export { DeleteUserController }
