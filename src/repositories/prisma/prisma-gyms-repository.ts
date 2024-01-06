import { prisma } from 'src/lib/prisma'
import { Prisma } from '@prisma/client'
import { IGymsRepository } from '../interfaces'

export default class PrismaGymsRepository implements IGymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    if (!gym) {
      return null
    }

    return gym
  }
}
