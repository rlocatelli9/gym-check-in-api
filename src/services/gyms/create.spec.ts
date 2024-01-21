import { beforeEach, describe, expect, it } from 'vitest'
import ServiceCreateGym from './create'
import FakeGymsRepository from 'src/repositories/fake/fake-gyms-repository'

let fakeGymsRepository: FakeGymsRepository
let sut: ServiceCreateGym

describe('Gym use case', () => {
  beforeEach(() => {
    fakeGymsRepository = new FakeGymsRepository()
    sut = new ServiceCreateGym(fakeGymsRepository)
  })

  it('should be able to create the gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym test',
      description: 'test',
      phone: '084999999999',
      latitude: -3.7461601,
      longitude: -38.5176505,
    })

    expect(gym.id).toBeTypeOf('string')
  })
})
