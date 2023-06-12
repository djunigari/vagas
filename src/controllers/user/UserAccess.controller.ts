import { GetUserAcessService } from '@/services/user/GetUserAcess.service'
import { Request, Response } from 'express'

class UserAccessController {
  constructor(private getUserAcessService: GetUserAcessService) {}

  async handle(req: Request, res: Response) {
    const name = (req.query.name as string)?.replace(/\s+/g, ' ').trim()

    try {
      const founded = await this.getUserAcessService.execute(name)
      return res
        .status(200)
        .send({ message: `User ${founded.name} has ${founded.views} views.` })
    } catch (error: any) {
      return res.status(400).send({ message: error.message })
    }
  }
}

export { UserAccessController }
