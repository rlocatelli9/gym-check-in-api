import { hash } from 'bcryptjs'
import { IUsersRepository } from 'src/repositories/interfaces'
import { RegisterServiceProps, RegisterServiceResponse } from '../interfaces'
import { UserAlreadyExistsError } from '../errors'

// SOLID
// D - Dependency Inversion Principle

export default class ServiceUserRegister {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterServiceProps): Promise<RegisterServiceResponse> {
    const passwordHash = await hash(password, 6)

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return { user }
  }
}
