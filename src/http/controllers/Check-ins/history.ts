import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInHistoryService } from 'src/services/factories/make-check-ins-history-service'

export async function HistoryCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const historyCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyCheckInsQuerySchema.parse(request.query)

  const historyCheckInService = makeCheckInHistoryService()

  const { checkIns } = await historyCheckInService.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
