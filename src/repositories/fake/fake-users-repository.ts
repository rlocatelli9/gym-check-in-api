import type { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../interfaces'

export default class FakeUsersRepository implements IUsersRepository {
  private users: Array<User> = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data?.id || 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    } as User

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) return null

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    if (!user) return null

    return user
  }
}
