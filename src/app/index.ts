import { env } from 'env'
import fastify from 'fastify'
import appRoutes from 'src/http/routes'
import { ZodError } from 'zod'

import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
export const app = fastify()

app.register(cors, {
  origin: 'http://localhost:3000',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
})

app.register(appRoutes)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO - in the future send log for an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
