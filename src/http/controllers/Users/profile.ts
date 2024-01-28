import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserProfileService } from 'src/services/factories/make-get-user-profile-service'

export default async function Profile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileService()

  const profile = await getUserProfile.execute({
    userId: request.user.sub,
  })

  const user = Object.assign({}, { ...profile.user, password_hash: undefined })

  return reply.status(200).send({
    user,
  })
}
