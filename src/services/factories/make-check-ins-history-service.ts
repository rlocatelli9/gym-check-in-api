import PrismaCheckInsRepository from 'src/repositories/prisma/prisma-checkIns-repository'
import ServiceCheckInsHistory from '../checkIns/checkInsHistory'

export function makeCheckInHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new ServiceCheckInsHistory(checkInsRepository)

  return service
}
