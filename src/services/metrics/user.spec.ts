import { beforeEach, describe, expect, it } from 'vitest'
import ServiceCheckInsUserMetrics from './user'
import FakeCheckInsRepository from 'src/repositories/fake/fake-checkIns-repository'

let fakeCheckInsRepository: FakeCheckInsRepository
let sut: ServiceCheckInsUserMetrics

describe('user metrics use case', () => {
  beforeEach(async () => {
    fakeCheckInsRepository = new FakeCheckInsRepository()
    sut = new ServiceCheckInsUserMetrics(fakeCheckInsRepository)
  })

  it('should be able to get check-in count from user metrics is zero', async () => {
    const { checkInsCount } = await sut.execute({
      userId: 'user-123',
    })

    expect(checkInsCount).toBe(0)
  })

  it('should be able to get check-in count from user metrics', async () => {
    for (let i = 1; i <= 22; i++) {
      await fakeCheckInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-123',
        validate_at: new Date(),
        created_at: new Date(),
        id: '1',
      })
    }

    const metrics = await sut.execute({
      userId: 'user-123',
    })

    expect(metrics).toEqual(
      expect.objectContaining({
        checkInsCount: 22,
      }),
    )
  })
})
