import { CheckIn, Gym, Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
}

export interface ICheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  findByGymId: (gymId: string) => Promise<CheckIn[] | []>
  findById: (id: string) => Promise<CheckIn | null>
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
}

export interface IGymsRepository {
  create: (data: Prisma.GymUncheckedCreateInput) => Promise<Gym>
  findById: (id: string) => Promise<Gym | null>
}
