import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsService } from 'src/services/factories/make-search-gyms-service'

export async function SearchGym(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQueryParamsSchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQueryParamsSchema.parse(request.query)

  const searchGymService = makeSearchGymsService()

  const { gyms } = await searchGymService.execute({
    query,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
