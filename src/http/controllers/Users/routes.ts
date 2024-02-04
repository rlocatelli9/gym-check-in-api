import { FastifyInstance } from 'fastify'
import Register from 'src/http/controllers/Users/register'
import Authenticate from 'src/http/controllers/Auth/authenticate'
import Profile from 'src/http/controllers/Users/profile'
import { verifyJWT } from 'src/http/middlewares/verifyJwt'

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/authenticate', Authenticate)

  /** authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, Profile)
}
