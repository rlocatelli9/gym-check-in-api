import { beforeEach, describe, expect, it, vi } from 'vitest'
import ServiceValidateCheckIn from './validate-check-in'
import FakeCheckInsRepository from 'src/repositories/fake/fake-checkIns-repository'
import { ResourceNotFoundError } from '../errors'
import { rejects } from 'assert'

let fakeCheckInsRepository: FakeCheckInsRepository
let sut: ServiceValidateCheckIn

describe('Validate check-in use case', () => {
  beforeEach(async () => {
    fakeCheckInsRepository = new FakeCheckInsRepository()
    sut = new ServiceValidateCheckIn(fakeCheckInsRepository)

    await fakeCheckInsRepository.create({
      gym_id: '1234-gym',
      user_id: '1234-user',
      id: '1234-checkIn',
    })

    // vi.useFakeTimers()
  })

  // afterEach(() => {
  //   vi.useRealTimers()
  // })

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
})
