import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'src/app'
import { createAndAuthenticateUser } from 'src/utils/create-and-authenticate-user'

describe('Metrics of check-ins E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to count metrics of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym test',
        description: 'test',
        phone: '084999999999',
        latitude: -3.7461601,
        longitude: -38.5176505,
      })

    const searchGymResponse = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'phone=084999999999',
      })
      .send()

    const { gyms } = searchGymResponse.body
    const [gym] = gyms

    await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -3.7461601,
        longitude: -38.5176505,
      })

    const metricsResponse = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(metricsResponse.statusCode).toEqual(200)
    expect(metricsResponse.body.checkInsCount).toBe(1)
  })
})
