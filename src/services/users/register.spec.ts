import { describe, expect, it } from 'vitest'
import ServiceUserRegister from './register'
import { compare } from 'bcryptjs'

describe('register use case', () => {
  it("The user's password need be crypt", async () => {
    const serviceUserRegister = new ServiceUserRegister({
      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        }
      },

      async findByEmail() {
        return null
      },
    })

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
})
