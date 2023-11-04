import { hash } from 'bcryptjs'
import { prisma } from 'src/lib/prisma'

type RegisterServiceProps = {
  name: string
  email: string
  password: string
}

export default async function RegisterService({
  name,
  email,
  password,
}: RegisterServiceProps) {
  const passwordHash = await hash(password, 6)

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    throw new Error('E-mail already exists')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  })
}
