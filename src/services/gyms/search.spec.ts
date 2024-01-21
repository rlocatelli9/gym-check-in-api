import { beforeEach, describe, expect, it } from 'vitest'
import ServiceSearchGym from './search'
import FakeGymsRepository from 'src/repositories/fake/fake-gyms-repository'

let fakeGymsRepository: FakeGymsRepository
let sut: ServiceSearchGym

describe('Search gym use case', () => {
  beforeEach(() => {
    fakeGymsRepository = new FakeGymsRepository()
    sut = new ServiceSearchGym(fakeGymsRepository)
  })

  it('should be able to search the gym by query', async () => {
    const { gyms } = await sut.execute({
      query: 'title=Gym test',
      page: 1,
    })

    expect(gyms).toHaveLength(0)
  })

  it('should be able to search paginate the gym by query', async () => {
    for (let i = 1; i <= 22; i++) {
      await fakeGymsRepository.create({
        title: 'Gym test',
        description: `test-${i}`,
        phone: `0849999999${String(i).padStart(2, '0')}`,
        latitude: -3.7461601,
        longitude: -38.5176505,
      })
    }
    const { gyms } = await sut.execute({
      query: 'title=Gym test',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        description: `test-21`,
      }),
      expect.objectContaining({
        description: `test-22`,
      }),
    ])
  })

  it('should be able to search gym by query with phone', async () => {
    for (let i = 1; i <= 22; i++) {
      await fakeGymsRepository.create({
        title: 'Gym test',
        description: `test-${i}`,
        phone: `0849999999${String(i).padStart(2, '0')}`,
        latitude: -3.7461601,
        longitude: -38.5176505,
      })
    }
    const { gyms } = await sut.execute({
      query: 'phone=084999999910',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        description: `test-10`,
      }),
    ])
  })
})
