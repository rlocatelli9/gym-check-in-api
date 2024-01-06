import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ServiceCheckInRegister from './checkIn'
import FakeCheckInsRepository from 'src/repositories/fake/fake-checkIns-repository'
import FakeGymsRepository from 'src/repositories/fake/fake-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let fakeCheckInsRepository: FakeCheckInsRepository
let fakeGymsRepository: FakeGymsRepository
let sut: ServiceCheckInRegister

describe('register use case', () => {
  beforeEach(async () => {
    fakeCheckInsRepository = new FakeCheckInsRepository()
    fakeGymsRepository = new FakeGymsRepository()
    sut = new ServiceCheckInRegister(fakeCheckInsRepository, fakeGymsRepository)
    vi.useFakeTimers()

    await fakeGymsRepository.create({
      id: 'gym-123',
      created_at: new Date(),
      description: 'decrição teste',
      phone: '84999999999',
      title: 'título teste',
      updated_at: new Date(),
      latitude: new Decimal(-3.7461601),
      longitude: new Decimal(-38.5176505),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-123',
      userId: 'user-123',
      userLatitude: -3.7461601,
      userLongitude: -38.5176505,
    })

    expect(checkIn.id).toBeTypeOf('string')
  })

  it('should not be able to check in on distant gym', async () => {
    await expect(() =>
      sut.execute({
        gymId: 'gym-123',
        userId: 'user-123',
        userLatitude: -3.7471197,
        userLongitude: -38.5183487,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 6, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-123',
      userId: 'user-123',
      userLatitude: -3.7461601,
      userLongitude: -38.5176505,
    })

    expect(
      async () =>
        await sut.execute({
          gymId: 'gym-123',
          userId: 'user-123',
          userLatitude: -3.7461601,
          userLongitude: -38.5176505,
        }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice in the different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 5, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-123',
      userId: 'user-123',
      userLatitude: -3.7461601,
      userLongitude: -38.5176505,
    })

    vi.setSystemTime(new Date(2024, 0, 6, 10, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-123',
      userId: 'user-123',
      userLatitude: -3.7461601,
      userLongitude: -38.5176505,
    })

    expect(() => checkIn).toBeTruthy()
  })
})
