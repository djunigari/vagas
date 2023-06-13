import { FindUserByNameService } from '@/services/user/FindUserByName.service'
import { Request, Response } from 'express'

class GetUserController {
  constructor(private findByName: FindUserByNameService) {}

  async handle(req: Request, res: Response) {
    const name = (req.query.name as string)?.replace(/\s+/g, ' ').trim()
    try {
      const founded = await this.findByName.execute(name)
      return res.status(200).send(founded)
    } catch (error: any) {
      return res.status(400).send({ message: error.message })
    }
  }
}

export { GetUserController }
