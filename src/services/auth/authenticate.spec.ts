import { beforeEach, describe, expect, it } from 'vitest'
import AuthenticateService from './authenticate'
import { hash } from 'bcryptjs'
import FakeUsersRepository from 'src/repositories/fake/fake-users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials'

let fakeUsersRepository: FakeUsersRepository
// sut => system under test
let sut: AuthenticateService

describe('authenticate use case', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()

    await fakeUsersRepository.create({
      name: 'teste',
      email: 'user@test',
      password_hash: await hash('abc123', 6),
    })

    sut = new AuthenticateService(fakeUsersRepository)
  })

  it('should be able to authenticate user', async () => {
    const { user } = await sut.execute({
      email: 'user@test',
      password: 'abc123',
    })

    expect(user.id).toBeTypeOf('string')
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await expect(
      sut.execute({
        email: 'tes@test',
        password: 'abc123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(
      sut.execute({
        email: 'user@test',
        password: 'abc',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
