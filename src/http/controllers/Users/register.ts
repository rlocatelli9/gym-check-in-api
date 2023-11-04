import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import ServiceUserRegister from 'src/services/Users/register'
import PrismaUsersRepository from 'src/repositories/prisma/prisma-users-repository'

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
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
