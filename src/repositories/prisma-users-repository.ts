import { prisma } from 'src/lib/prisma'
import { Prisma } from '@prisma/client'

export default class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
