import { FastifyInstance } from 'fastify'
import Register from './controllers/Users/register'
import Authenticate from './controllers/Auth/authenticate'
import Profile from './controllers/Users/profile'
import { verifyJWT } from './middlewares/verifyJwt'

export default async function appRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/authenticate', Authenticate)

  /** authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, Profile)
}
