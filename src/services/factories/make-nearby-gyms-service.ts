import PrismaGymsRepository from 'src/repositories/prisma/prisma-gyms-repository'
import ServiceSearchNearbyGyms from '../gyms/search-nearby'

export function makeSearchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new ServiceSearchNearbyGyms(gymsRepository)

  return service
}
