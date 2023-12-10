import PrismaUsersRepository from 'src/repositories/prisma/prisma-users-repository'
import ServiceUserRegister from '../users/register'

export function makeRegisterService(): ServiceUserRegister {
  const usersRepository = new PrismaUsersRepository()
  const registerUserService = new ServiceUserRegister(usersRepository)

  return registerUserService
}
