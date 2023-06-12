import { app } from '@/app'
import request from 'supertest'

describe('Delete user controller', () => {
  let token = ''
  beforeAll(async () => {
    const tokenResponse = await request(app)
      .post('/signin')
      .send({ username: 'aaa' })
    token = 'Bearer ' + tokenResponse.body.token
  })

  it('should be able to delete user', async () => {
    const createdUserResponse = await request(app)
      .post('/users')
      .send({ name: 'teste', job: 'test job' })

    const response = await request(app)
      .delete('/users')
      .send({ name: 'teste' })
      .set('authorization', token)

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(createdUserResponse.body.id)
  })

  it('should not be able to delete an user with empty name', async () => {
    const response = await request(app)
      .delete('/users')
      .send({ name: '' })
      .set('authorization', token)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User not found')
  })

  it('should not be able to delete an user does not exist', async () => {
    const response = await request(app)
      .delete('/users')
      .send({ name: 'abc' })
      .set('authorization', token)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User not found')
  })

  it('should not be able to delete an user with empty name', async () => {
    const response = await request(app)
      .delete('/users')
      .send({ name: '' })
      .set('authorization', token)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User not found')
  })

  it('should not be able to delete an user without authorization', async () => {
    const response = await request(app).delete('/users').send({ name: 'abc' })

    expect(response.status).toBe(401)
  })
})
