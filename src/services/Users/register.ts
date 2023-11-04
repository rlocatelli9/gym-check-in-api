import { hash } from 'bcryptjs'
import { prisma } from 'src/lib/prisma'
import PrismaUsersRepository from 'src/repositories/prisma-users-repository'

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

  const prismaUsersRepository = new PrismaUsersRepository()
  await prismaUsersRepository.create({
    name,
    email,
    password_hash: passwordHash,
  })
}
