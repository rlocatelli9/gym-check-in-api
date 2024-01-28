import { ICheckInsRepository } from 'src/repositories/interfaces'
import {
  CheckInsHistoryServiceProps,
  CheckInsHistoryServiceResponse,
} from '../interfaces'

// SOLID
// D - Dependency Inversion Principle

export default class ServiceCheckInsHistory {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: CheckInsHistoryServiceProps): Promise<CheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
