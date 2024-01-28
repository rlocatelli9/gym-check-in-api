import PrismaCheckInsRepository from 'src/repositories/prisma/prisma-checkIns-repository'
import ServiceValidateCheckIn from '../checkIns/validate-check-in'

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new ServiceValidateCheckIn(checkInsRepository)

  return service
}
