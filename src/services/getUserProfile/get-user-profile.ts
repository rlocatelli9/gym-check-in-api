import { IUsersRepository } from 'src/repositories/interfaces'
import {
  GetUserProfileServiceRequest,
  GetUserProfileServiceResponse,
} from '../interfaces'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export default class GetUserProfileService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
