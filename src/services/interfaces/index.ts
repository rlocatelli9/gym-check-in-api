import { User } from '@prisma/client'

export type RegisterServiceProps = {
  name: string
  email: string
  password: string
}

export type RegisterServiceResponse = {
  user: User
}

export type AuthenticateServiceRequest = {
  email: string
  password: string
}

export type AuthenticateServiceResponse = {
  user: User
}
