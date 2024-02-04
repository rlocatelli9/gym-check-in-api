import { FastifyInstance } from 'fastify'
import { verifyJWT } from 'src/http/middlewares/verifyJwt'
import { CreateCheckIn } from './create'
import { ValidateCheckIn } from './validate'
import { HistoryCheckIn } from './history'
import { MetricsCheckIn } from './metrics'

export default async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', HistoryCheckIn)
  app.get('/check-ins/metrics', MetricsCheckIn)

  app.post('/gyms/:gymId/check-ins', CreateCheckIn)
  app.patch('/check-ins/:checkInId/validate', ValidateCheckIn)
}
