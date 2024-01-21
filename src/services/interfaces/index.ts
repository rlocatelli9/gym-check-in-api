import { CheckIn, Gym, User } from '@prisma/client'

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

export type CheckInServiceProps = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}
export type CheckInServiceResponse = {
  checkIn: CheckIn
}

export type CreateGymServiceProps = {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export type CreateGymServiceResponse = {
  gym: Gym
}

export type CheckInsHistoryServiceProps = {
  userId: string
  page: number
}
export type CheckInsHistoryServiceResponse = {
  checkIns: CheckIn[]
}

export type CheckInsUserMetricsServiceProps = {
  userId: string
}
export type CheckInsUserMetricsServiceResponse = {
  checkInsCount: number
}

export type SearchGymServiceProps = {
  query: string
  page: number
}

export type SearchGymServiceResponse = {
  gyms: Gym[]
}
