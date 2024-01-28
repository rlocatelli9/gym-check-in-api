import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from 'src/services/errors/invalid-credentials'
import { makeAuthenticateService } from 'src/services/factories/make-authenticate-service'

export default async function Authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticate = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticate.parse(request.body)
  console.log({ email, password })

  try {
    const authenticateService = makeAuthenticateService()
    await authenticateService.execute({
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
