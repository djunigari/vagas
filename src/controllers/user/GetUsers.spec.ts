import { app } from '@/app'
import request from 'supertest'

describe('Get users controller', () => {
  it('should be able to get user', async () => {
    const response = await request(app).get('/users')

    expect(response.status).toBe(200)
  })
})
