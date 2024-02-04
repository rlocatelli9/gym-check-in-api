import { FastifyInstance } from 'fastify'
import usersRoutes from './controllers/Users/routes'
import gymsRoutes from './controllers/Gyms/routes'
import checkInsRoutes from './controllers/Check-ins/routes'

export default async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(gymsRoutes)
  app.register(checkInsRoutes)
}
