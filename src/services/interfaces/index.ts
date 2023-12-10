import { User } from '@prisma/client'

type PatternRequest = {
  email: string
  password: string
}

type PatternResponse = {
  user: User
}

export type RegisterServiceProps = PatternRequest & { name: string }
export type RegisterServiceResponse = PatternResponse

export type AuthenticateServiceRequest = PatternRequest
export type AuthenticateServiceResponse = PatternResponse

export type GetUserProfileServiceRequest = { userId: string }
export type GetUserProfileServiceResponse = PatternResponse
