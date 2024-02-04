import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'src/app'
import { createAndAuthenticateUser } from 'src/utils/create-and-authenticate-user'

describe('Search Gyms E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search Gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    for (let i = 1; i <= 5; i++) {
      await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Gym test',
          description: `test-${i}`,
          phone: `0849999999${String(i).padStart(2, '0')}`,
          latitude: -3.7461601,
          longitude: -38.5176505,
        })
    }

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'phone=084999999905',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        phone: '084999999905',
      }),
    ])
  })
})
