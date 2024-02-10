import { FastifyInstance } from 'fastify'
import Register from 'src/http/controllers/Users/register'
import Authenticate from 'src/http/controllers/Auth/authenticate'
import Refresh from 'src/http/controllers/Auth/refresh'
import Profile from 'src/http/controllers/Users/profile'
import { verifyJWT } from 'src/http/middlewares/verifyJwt'

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/authenticate', Authenticate)
  app.patch('/token/refresh', Refresh)

  /** authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, Profile)
}
