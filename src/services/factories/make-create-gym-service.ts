import PrismaGymsRepository from 'src/repositories/prisma/prisma-gyms-repository'
import ServiceCreateGym from '../gyms/create'

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new ServiceCreateGym(gymsRepository)

  return service
}
