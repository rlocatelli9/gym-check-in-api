import { FastifyInstance } from 'fastify'
import Register from './controllers/Users/register'
import Authenticate from './controllers/Auth/authenticate'

export default async function appRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/sessions', Authenticate)
}
