import type { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../interfaces'

export default class FakeCheckInsRepository implements ICheckInsRepository {
  private checkIns: Array<CheckIn> = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: data?.id || randomUUID(),
      validate_at: data.validate_at ? new Date(data.validate_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: data.created_at ? new Date(data.created_at) : null,
    } as CheckIn

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findByGymId(gymId: string) {
    const checkIn = this.checkIns.filter((checkIn) => checkIn.gym_id === gymId)

    return checkIn
  }

  async findById(id: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }
}
