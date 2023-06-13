import { app } from '@/app'
import request from 'supertest'

describe('Update user controller', () => {
  let token = ''
  beforeAll(async () => {
    const tokenResponse = await request(app)
      .post('/signin')
      .send({ username: 'aaa' })
    token = 'Bearer ' + tokenResponse.body.token
  })

  it('should be able to update user', async () => {
    const createdUserResponse = await request(app)
      .post('/users')
      .send({ name: 'teste', job: 'test job' })
    const updatedUserResponse = await request(app)
      .put('/users')
      .send({
        id: createdUserResponse.body.id,
        name: 'new test',
        job: 'new job',
      })
      .set('authorization', token)

    expect(updatedUserResponse.status).toBe(200)
    expect(updatedUserResponse.body.id).toBe(createdUserResponse.body.id)
    expect(updatedUserResponse.body.name).toBe('new test')
    expect(updatedUserResponse.body.job).toBe('new job')
    expect(updatedUserResponse.body.views).toBe(0)

    const response = await request(app).get('/user?name=new test')

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(createdUserResponse.body.id)
    expect(response.body.name).toBe('new test')
    expect(response.body.job).toBe('new job')
    expect(response.body.views).toBe(1)
  })

  it('should not be able to update an user with empty name', async () => {
    const response = await request(app)
      .put('/users')
      .send({ name: '' })
      .set('authorization', token)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User not found')
  })

  it('should not be able to update an user does not exist', async () => {
    const response = await request(app)
      .put('/users')
      .send({ name: 'abc' })
      .set('authorization', token)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User not found')
  })

  it('should not be able to delete an user without authorization', async () => {
    const response = await request(app).put('/users').send({ name: 'abc' })

    expect(response.status).toBe(401)
  })
})
