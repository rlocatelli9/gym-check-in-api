import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import AuthenticationService from 'src/services/auth/authenticate'
import PrismaUsersRepository from 'src/repositories/prisma/prisma-users-repository'
import { InvalidCredentialsError } from 'src/services/errors/invalid-credentials'

export default async function Authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticate = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticate.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUserRepository = new AuthenticationService(usersRepository)
    await registerUserRepository.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(200).send()
}
