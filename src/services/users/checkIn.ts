import {
  ICheckInsRepository,
  IGymsRepository,
} from 'src/repositories/interfaces'
import { CheckInServiceProps, CheckInServiceResponse } from '../interfaces'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { getDistanceBetweenCoords } from 'src/utils/get-distance-between-coords'

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

    console.log(distance)

    if (distance > MAX_DISTANCE_KILOMETERS) {
      throw new Error()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error()
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
