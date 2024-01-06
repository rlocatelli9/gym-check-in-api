import { Gym, Prisma } from '@prisma/client'
import { IGymsRepository } from '../interfaces'
import { randomUUID } from 'node:crypto'

export default class FakeGymsRepository implements IGymsRepository {
  private gyms: Array<Gym> = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      ...data,
      id: data?.id || randomUUID(),
    } as Gym

    this.gyms.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
