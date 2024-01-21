import { ICheckInsRepository } from 'src/repositories/interfaces'
import {
  CheckInsUserMetricsServiceProps,
  CheckInsUserMetricsServiceResponse,
} from '../interfaces'

// SOLID
// D - Dependency Inversion Principle

export default class ServiceUserMetrics {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: CheckInsUserMetricsServiceProps): Promise<CheckInsUserMetricsServiceResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
