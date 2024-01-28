import PrismaCheckInsRepository from 'src/repositories/prisma/prisma-checkIns-repository'
import ServiceUserMetrics from '../metrics/user'

export function makeUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new ServiceUserMetrics(checkInsRepository)

  return service
}
