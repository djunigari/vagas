export class User {
  constructor(name: string, job: string) {
    this.name = name
    this.job = job
    this.views = 0
  }

  id?: number
  name: string
  job: string
  views: number
}
