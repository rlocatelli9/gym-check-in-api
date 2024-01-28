import { ICheckInsRepository } from 'src/repositories/interfaces'
import {
  ValidateCheckInServiceProps,
  ValidateCheckInServiceResponse,
} from '../interfaces'
import { LateCheckInValidationError, ResourceNotFoundError } from '../errors'
import dayjs from 'dayjs'

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
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
