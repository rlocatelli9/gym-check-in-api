import { prisma } from 'src/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { IGymsRepository } from '../interfaces'
import { SearchNearbyGymServiceProps } from 'src/services/interfaces'

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

  async findManyNearby({
    userLatitude: latitude,
    userLongitude: longitude,
  }: SearchNearbyGymServiceProps) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10 
    `

    return gyms
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

    const gyms = await prisma.gym.findMany({
      where: {
        ...fields,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
}
