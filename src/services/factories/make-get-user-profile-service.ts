import PrismaUsersRepository from 'src/repositories/prisma/prisma-users-repository'
import GetUserProfileService from '../getUserProfile/get-user-profile'

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new GetUserProfileService(usersRepository)

  return service
}
