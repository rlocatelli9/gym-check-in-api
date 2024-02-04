import { FastifyRequest, FastifyReply } from 'fastify'
import { makeUserMetricsService } from 'src/services/factories/make-user-metrics-service'

export async function MetricsCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const metricsCheckInService = makeUserMetricsService()

  const { checkInsCount } = await metricsCheckInService.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
