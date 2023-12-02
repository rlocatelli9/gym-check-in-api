import { IUsersRepository } from 'src/repositories/interfaces'
import {
  AuthenticateServiceRequest,
  AuthenticateServiceResponse,
} from '../interfaces'
import { InvalidCredentialsError } from '../errors/invalid-credentials'
import { compare } from 'bcryptjs'

export default class AuthenticateService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
