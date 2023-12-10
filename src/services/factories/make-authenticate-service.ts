import PrismaUsersRepository from 'src/repositories/prisma/prisma-users-repository'
import AuthenticateService from '../auth/authenticate'

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(usersRepository)

  return authenticateService
}
