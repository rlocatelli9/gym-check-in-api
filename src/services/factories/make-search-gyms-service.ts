import ServiceSearchGym from '../gyms/search'
import PrismaGymsRepository from 'src/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new ServiceSearchGym(gymsRepository)

  return service
}
