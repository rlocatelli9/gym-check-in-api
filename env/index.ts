import 'dotenv/config'
import z from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
})

const environment = environmentSchema.safeParse(process.env)

if(!environment?.success){
  console.error('Invalid environment variables!', environment.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = environment.data