import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchNearbyGymsService } from 'src/services/factories/make-nearby-gyms-service'
import { z } from 'zod'

export async function NearbyGym(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQueryParamsSchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = searchGymQueryParamsSchema.parse(request.body)

  const searchNearbyGymService = makeSearchNearbyGymsService()

  const { gyms } = await searchNearbyGymService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
