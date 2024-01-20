import { beforeEach, describe, expect, it } from 'vitest'
import ServiceCheckInsHistory from './checkInsHistory'
import FakeCheckInsRepository from 'src/repositories/fake/fake-checkIns-repository'

let fakeCheckInsRepository: FakeCheckInsRepository
let sut: ServiceCheckInsHistory

describe('register use case', () => {
  beforeEach(async () => {
    fakeCheckInsRepository = new FakeCheckInsRepository()
    sut = new ServiceCheckInsHistory(fakeCheckInsRepository)
  })

  it('should be able to get chek-in history by userId', async () => {
    await fakeCheckInsRepository.create({
      gym_id: 'gym-123',
      user_id: 'user-123',
      validate_at: new Date(),
      created_at: new Date(),
      id: '1',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-123',
      page: 1,
    })

    expect(Array.isArray(checkIns)).toBeTruthy()
    expect(checkIns).toHaveLength(1)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-123',
        user_id: 'user-123',
      }),
    ])
  })

  it('should be able to paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await fakeCheckInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-123',
        validate_at: new Date(),
        created_at: new Date(),
        id: '1',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-123',
      page: 2,
    })

    expect(Array.isArray(checkIns)).toBeTruthy()
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: `gym-21`,
      }),
      expect.objectContaining({
        gym_id: `gym-22`,
      }),
    ])
  })
})
