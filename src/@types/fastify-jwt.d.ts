import '@fastify/jwt'
import { ROLES } from 'src/services/interfaces'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role: ROLES
    }
  }
}
