import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ServiceValidateCheckIn from './validate-check-in'
import FakeCheckInsRepository from 'src/repositories/fake/fake-checkIns-repository'
import { LateCheckInValidationError, ResourceNotFoundError } from '../errors'

let fakeCheckInsRepository: FakeCheckInsRepository
let sut: ServiceValidateCheckIn

describe('Validate check-in use case', () => {
  beforeEach(async () => {
    fakeCheckInsRepository = new FakeCheckInsRepository()
    sut = new ServiceValidateCheckIn(fakeCheckInsRepository)
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 0, 1, 13, 40))
    await fakeCheckInsRepository.create({
      gym_id: '1234-gym',
      user_id: '1234-user',
      id: '1234-checkIn',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const { checkIn } = await sut.execute({ checkInId: '1234-checkIn' })

    expect(checkIn).toEqual(
      expect.objectContaining({
        id: '1234-checkIn',
      }),
    )
    expect(checkIn.validate_at).toBeInstanceOf(Date)
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'not-valid' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check-in after 20 minutes of its creation', async () => {
    const twentyOneMinutesInMilliseconds = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMilliseconds)

    await expect(() =>
      sut.execute({ checkInId: '1234-checkIn' }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
