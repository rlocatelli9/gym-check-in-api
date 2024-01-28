import { beforeEach, describe, expect, it } from 'vitest'
import ServiceSearchNearbyGym from './search-nearby'
import FakeGymsRepository from 'src/repositories/fake/fake-gyms-repository'

let fakeGymsRepository: FakeGymsRepository
let sut: ServiceSearchNearbyGym

describe('Search nearby gyms use case', () => {
  beforeEach(() => {
    fakeGymsRepository = new FakeGymsRepository()
    sut = new ServiceSearchNearbyGym(fakeGymsRepository)
  })

  it('should be able to search nearby gyms', async () => {
    await fakeGymsRepository.create({
      title: 'Near Gym',
      description: `test-gym`,
      phone: `084999999901`,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await fakeGymsRepository.create({
      title: 'Far Gym',
      description: `test-gym`,
      phone: `084999999902`,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: `Near Gym`,
      }),
    ])
  })
})
