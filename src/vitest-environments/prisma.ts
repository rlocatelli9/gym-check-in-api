import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

// DATABASE_URL="postgresql://docker:docker@localhost:5432/api-gym-check?schema=public"
const prismaClient = new PrismaClient()

function generateURLDatabase(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not specified')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup() {
    const schema = randomUUID()
    const databaseURL = generateURLDatabase(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prismaClient.$executeRawUnsafe(`
          DROP SCHEMA IF EXISTS "${schema}" CASCADE;
        `)
        await prismaClient.$disconnect()
      },
    }
  },
}
