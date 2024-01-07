import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import FakeUsersRepository from 'src/repositories/fake/fake-users-repository'
import GetUserProfileService from './get-user-profile'
import { ResourceNotFoundError } from '../errors'

let fakeUsersRepository: FakeUsersRepository
// sut => system under test
let sut: GetUserProfileService

describe('Get User Profile use case', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()

    await fakeUsersRepository.create({
      id: '1234',
      name: 'teste',
      email: 'user@test',
      password_hash: await hash('abc123', 6),
    })

    sut = new GetUserProfileService(fakeUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const { user } = await sut.execute({
      userId: '1234',
    })

    expect(user.id).toEqual('1234')
  })

  it('should not be able to get user profile with wrong Id', async () => {
    await expect(
      sut.execute({
        userId: 'not-exists',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
