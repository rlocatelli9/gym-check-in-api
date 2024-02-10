import { FastifyInstance } from 'fastify'
import { verifyJWT } from 'src/http/middlewares/verifyJwt'
import { SearchGym } from './search'
import { NearbyGym } from './nearby'
import { CreateGym } from './create'
import { verifyUserRole } from 'src/http/middlewares/verify-user-role'

export default async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', SearchGym)
  app.get('/gyms/nearby', NearbyGym)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, CreateGym)
}
