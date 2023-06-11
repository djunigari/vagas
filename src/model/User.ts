import { generateUserId } from '@/data/utils/generateUserId'

export class User {
  constructor(name: string, job: string) {
    this.id = generateUserId()
    this.name = name
    this.job = job
    this.views = 0
  }

  id: number
  name: string
  job: string
  views: number
}
