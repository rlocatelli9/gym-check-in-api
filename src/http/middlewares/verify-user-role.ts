import { FastifyReply, FastifyRequest } from 'fastify'
import { ROLES } from 'src/services/interfaces'

export function verifyUserRole(roleToVerify: ROLES) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user
    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
