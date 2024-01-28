import {
  ICheckInsRepository,
  IGymsRepository,
} from 'src/repositories/interfaces'
import { CheckInServiceProps, CheckInServiceResponse } from '../interfaces'
import { getDistanceBetweenCoords } from 'src/utils/get-distance-between-coords'
import {
  MaxDistanceError,
  MaxNumberOfCheckInsError,
  ResourceNotFoundError,
} from '../errors'

const MAX_DISTANCE_KILOMETERS = 0.1

// SOLID
// D - Dependency Inversion Principle

export default class ServiceCheckInRegister {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInServiceProps): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoords({
      from: { latitude: userLatitude, longitude: userLongitude },
      to: {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    })

    if (distance > MAX_DISTANCE_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
