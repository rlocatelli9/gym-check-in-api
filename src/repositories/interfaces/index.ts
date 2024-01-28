import { CheckIn, Gym, Prisma, User } from '@prisma/client'
import { SearchNearbyGymServiceProps } from 'src/services/interfaces'

export interface IUsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
}

export interface ICheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  findById: (id: string) => Promise<CheckIn | null>
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>
  countByUserId: (userId: string) => Promise<number>
  save: (checkIn: CheckIn) => Promise<CheckIn | null>
}

export interface IGymsRepository {
  create: (data: Prisma.GymCreateInput) => Promise<Gym>
  findById: (id: string) => Promise<Gym | null>
  searchManyByQuery: (query: string, page: number) => Promise<Gym[]>
  findManyNearby: (params: SearchNearbyGymServiceProps) => Promise<Gym[]>
}
