import {
  ICheckInsRepository,
  IGymsRepository,
} from 'src/repositories/interfaces'
import {
  ValidateCheckInServiceProps,
  ValidateCheckInServiceResponse,
} from '../interfaces'
import { getDistanceBetweenCoords } from 'src/utils/get-distance-between-coords'
import { ResourceNotFoundError } from '../errors'

// SOLID
// D - Dependency Inversion Principle

export default class ServiceValidateCheckIn {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInServiceProps): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validate_at = new Date()

    const validatedCheckIn = await this.checkInsRepository.save(checkIn)

    if (!validatedCheckIn) {
      throw new ResourceNotFoundError()
    }

    return {
      checkIn: validatedCheckIn,
    }
  }
}
