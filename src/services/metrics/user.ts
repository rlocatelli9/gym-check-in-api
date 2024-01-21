import { ICheckInsRepository } from 'src/repositories/interfaces'
import {
  CheckInsMetricsServiceProps,
  CheckInsMetricsServiceResponse,
} from '../interfaces'

// SOLID
// D - Dependency Inversion Principle

export default class ServiceCheckInsHistory {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: CheckInsMetricsServiceProps): Promise<CheckInsMetricsServiceResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
