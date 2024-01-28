import { FastifyRequest, FastifyReply } from 'fastify'

export default async function Profile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  console.log(request.user.sub)

  return reply.status(200).send()
}
