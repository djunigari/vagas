import { GetAllUsersService } from '@/services/user/GetAllUsers.service'
import { Request, Response } from 'express'

class GetUsersController {
  constructor(private getAllUsers: GetAllUsersService) {}

  async handle(req: Request, res: Response) {
    const list = await this.getAllUsers.execute()
    return res.status(200).send(list)
  }
}

export { GetUsersController }
