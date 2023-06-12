import { app } from '@/app'
import request from 'supertest'

describe('User access controller', () => {
  it('should be able to get user access', async () => {
    await request(app).post('/users').send({ name: 'teste', job: 'test job' })

    const response = await request(app).get('/users/access?name=teste')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('User teste has 0 views.')
  })

  it('should throw error for user does not exist', async () => {
    const response = await request(app).get('/users/access?name=abc')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User not found')
  })

  it('should throw error for empyt name', async () => {
    const response = await request(app).get('/users/access?name=')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User not found')
  })
})
