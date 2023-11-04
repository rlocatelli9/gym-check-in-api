import { hash } from 'bcryptjs'
import { IUsersRepository } from 'src/repositories/interfaces'
import { UserAlreadyExistsError } from '../errros/user-already-exists'

type RegisterServiceProps = {
  name: string
  email: string
  password: string
}

// SOLID
// D - Dependency Inversion Principle

export default class ServiceUserRegister {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterServiceProps) {
    const passwordHash = await hash(password, 6)

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
