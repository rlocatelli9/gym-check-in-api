import { IGymsRepository } from 'src/repositories/interfaces'
import { SearchGymServiceProps, SearchGymServiceResponse } from '../interfaces'

// SOLID
// D - Dependency Inversion Principle

export default class ServiceSearchGym {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymServiceProps): Promise<SearchGymServiceResponse> {
    const gyms = await this.gymsRepository.searchManyByQuery(query, page)

    return { gyms }
  }
}
