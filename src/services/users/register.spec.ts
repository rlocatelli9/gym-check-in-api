import { describe, expect, it } from 'vitest'
import ServiceUserRegister from './register'
import { compare } from 'bcryptjs'
import FakeUsersRepository from 'src/repositories/fake/fake-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

describe('register use case', () => {
  it("should be able to crypt the user's password", async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const serviceUserRegister = new ServiceUserRegister(fakeUsersRepository)

    const {
      user: { password_hash: passwordHash },
    } = await serviceUserRegister.execute({
      name: 'user',
      email: 'user@test',
      password: 'abc123',
    })

    const isPasswordCorrectlyHashed = await compare('abc123', passwordHash)

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to create user with duplicated e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const serviceUserRegister = new ServiceUserRegister(fakeUsersRepository)

    const email = 'user@test'

    async function createUser() {
      await serviceUserRegister.execute({
        name: 'user',
        email,
        password: 'abc123',
      })
    }

    await createUser()

    await expect(createUser()).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const serviceUserRegister = new ServiceUserRegister(fakeUsersRepository)

    const { user } = await serviceUserRegister.execute({
      name: 'user',
      email: 'user@test',
      password: 'abc123',
    })

    expect(user.id).toBeTypeOf('string')
  })
})
