import { FastifyReply, FastifyRequest } from 'fastify'
import { ROLES } from 'src/@types/fastify-jwt'

export function verifyUserRole(roleToVerify: ROLES) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user
    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
