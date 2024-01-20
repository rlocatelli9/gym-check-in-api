import { CheckIn, Gym, Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
}

export interface ICheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>
}

export interface IGymsRepository {
  create: (data: Prisma.GymCreateInput) => Promise<Gym>
  findById: (id: string) => Promise<Gym | null>
}
