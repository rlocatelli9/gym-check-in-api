import '@fastify/jwt'

export type ROLES = 'ADMIN' | 'MANAGER' | 'MEMBER'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role: ROLES
    }
  }
}
