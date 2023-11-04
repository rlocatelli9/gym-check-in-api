import { prisma } from 'src/lib/prisma'
import { Prisma } from '@prisma/client'

export interface IPrismaUsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<Prisma.UserCreateInput>
  findUnique: (email: string) => Promise<Prisma.UserCreateInput | null>
}

export default class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findUnique(email: string) {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return userExists
  }
}
