import { IGymsRepository } from 'src/repositories/interfaces'
import { CreateGymServiceProps, CreateGymServiceResponse } from '../interfaces'

// SOLID
// D - Dependency Inversion Principle

export default class ServiceCreateGym {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymServiceProps): Promise<CreateGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
