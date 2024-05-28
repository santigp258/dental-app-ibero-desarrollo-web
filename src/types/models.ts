import {
  Department,
  Municipality,
  Patient,
  Profession,
  Profile,
  User,
  Gender,
} from '@prisma/client'
import { Session } from 'next-auth'

export type ProfileType = Profile & {
  profession?: Profession
}

export type WithProfileType = {
  profile: ProfileType
}

export type UserType = User & WithProfileType
export type DepartmentType = Department
export type ProfessionType = Profession
export type MunicipalityType = Municipality

export type PatientType = Patient & WithProfileType

export type NextAuthSessionType = Session & { account: UserType }
