import PrismaCheckInsRepository from 'src/repositories/prisma/prisma-checkIns-repository'
import PrismaGymsRepository from 'src/repositories/prisma/prisma-gyms-repository'
import ServiceCheckInRegister from '../checkIns/checkIn'

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const service = new ServiceCheckInRegister(checkInsRepository, gymsRepository)

  return service
}
