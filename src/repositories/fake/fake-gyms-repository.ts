import { Gym, Prisma } from '@prisma/client'
import { IGymsRepository } from '../interfaces'
import { randomUUID } from 'node:crypto'

export default class FakeGymsRepository implements IGymsRepository {
  private gyms: Array<Gym> = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data?.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      updated_at: new Date(),
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

  async searchManyByQuery(query: string, page: number) {
    const querySearch = query.trim().split(';') ?? []
    let fields = {}

    if (querySearch.length > 0) {
      querySearch
        .map((element) => {
          const [field, value] = element.split('=')
          return { [field]: value }
        })
        .forEach((item) => {
          fields = { ...fields, ...item }
        })
    }
    let gyms: Gym[] = []
    Object.entries(fields).forEach(([field, value]) => {
      gyms = this.gyms.filter((gym) => gym[field as keyof Gym] === value)
    })

    let pageValue = page
    if (page < 1) {
      pageValue = 1
    }

    const paginatedGyms = gyms.slice((pageValue - 1) * 20, pageValue * 20)

    return paginatedGyms
  }
}
