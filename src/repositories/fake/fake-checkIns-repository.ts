import type { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../interfaces'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export default class FakeCheckInsRepository implements ICheckInsRepository {
  private checkIns: Array<CheckIn> = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: data?.id ?? randomUUID(),
      validate_at: data.validate_at ? new Date(data.validate_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
    } as CheckIn

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }
}
