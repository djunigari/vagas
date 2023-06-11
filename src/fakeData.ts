export class User {
  constructor(name: string, job: string) {
    this.id = generateId()
    this.name = name
    this.job = job
    this.views = 0
  }

  id: number
  name: string
  job: string
  views: number
}

const generateId = () => {
  lastId++
  return lastId
}

let lastId = 1

export let list = [
  {
    id: 1,
    name: 'João Oliveira',
    job: 'Desenvolvedor',
    views: 0,
  },
]
