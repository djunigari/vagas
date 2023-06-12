import { app } from '@/app'
import request from 'supertest'

describe('Create user controller', () => {
  it('should be able to create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'teste', job: 'test job' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body.name).toBe('teste')
    expect(response.body.job).toBe('test job')
    expect(response.body.views).toBe(0)
  })

  it('should not be able to create an user with empty name', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: '', job: 'test job' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("User's name can not be empty or blank")
  })

  it('should not be able to create an existing user', async () => {
    await request(app).post('/users').send({ name: 'test', job: 'test job' })

    const response = await request(app)
      .post('/users')
      .send({ name: 'test', job: 'test job' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User already exists!')
  })
})
