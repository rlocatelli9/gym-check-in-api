import { FastifyInstance } from 'fastify'
import usersRoutes from './controllers/Users/routes'
import gymsRoutes from './controllers/Gyms/routes'

export default async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(gymsRoutes)
}
