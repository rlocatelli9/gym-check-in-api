import { IGymsRepository } from 'src/repositories/interfaces'
import {
  SearchNearbyGymServiceProps,
  SearchNearbyGymServiceResponse,
} from '../interfaces'

// SOLID
// D - Dependency Inversion Principle

export default class ServiceSearchNearbyGyms {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: SearchNearbyGymServiceProps): Promise<SearchNearbyGymServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
    })

    return { gyms }
  }
}
