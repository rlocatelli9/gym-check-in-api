import { prisma } from 'src/lib/prisma'
import type { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../interfaces'
import dayjs from 'dayjs'

export default class FakeCheckInsRepository implements ICheckInsRepository {
  private checkIns: Array<CheckIn> = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          lte: endOfTheDay.toISOString(),
          gte: startOfTheDay.toISOString(),
        },
      },
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }
}
