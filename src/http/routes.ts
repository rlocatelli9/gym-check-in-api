import { FastifyInstance } from 'fastify'
import Register from './controllers/Users/register'

export default async function appRoutes(app: FastifyInstance) {
  app.post('/users', Register)
}
