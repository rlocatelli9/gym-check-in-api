import { beforeAll, describe, expect, it } from 'vitest'
import AuthenticateService from './authenticate'
import { hash } from 'bcryptjs'
import FakeUsersRepository from 'src/repositories/fake/fake-users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials'

const fakeUsersRepository = new FakeUsersRepository()
async function createUser() {
  await fakeUsersRepository.create({
    name: 'teste',
    email: 'user@test',
    password_hash: await hash('abc123', 6),
  })
}
describe('authenticate use case', () => {
  beforeAll(async () => {
    await createUser()
  })

  it('should be able to authenticate user', async () => {
    // sut => system under test
    const sut = new AuthenticateService(fakeUsersRepository)

    const { user } = await sut.execute({
      email: 'user@test',
      password: 'abc123',
    })

    expect(user.id).toBeTypeOf('string')
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    // sut => system under test
    const sut = new AuthenticateService(fakeUsersRepository)

    await expect(
      sut.execute({
        email: 'tes@test',
        password: 'abc123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    // sut => system under test
    const sut = new AuthenticateService(fakeUsersRepository)

    await expect(
      sut.execute({
        email: 'user@test',
        password: 'abc',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
