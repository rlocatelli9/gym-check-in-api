import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import ServiceUserRegister from 'src/services/Users/register'
import PrismaUsersRepository from 'src/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from 'src/services/errros/user-already-exists'

export default async function Register(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUserRepository = new ServiceUserRegister(usersRepository)
    await registerUserRepository.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
