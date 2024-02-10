import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from 'src/services/errors/user-already-exists'
import { makeRegisterService } from 'src/services/factories/make-register-service'

export default async function Register(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'MANAGER', 'MEMBER']).default('MEMBER'),
  })

  const { name, email, password, role } = registerBodySchema.parse(request.body)

  try {
    const registerUserService = makeRegisterService()

    await registerUserService.execute({
      name,
      email,
      password,
      role,
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
