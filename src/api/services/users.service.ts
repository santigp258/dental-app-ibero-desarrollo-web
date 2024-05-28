import prisma from '@/api/lib/prisma'

import { Prisma } from '@prisma/client'
import Service from '@/api/services/service.service'
import _ from 'lodash'

export default class UsersService extends Service {
  constructor() {
    super()
    // this is for avoid show password in response
    this.fillable = {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      profile: true,
    }
  }

  public getUsers(arg: Prisma.UserFindManyArgs = {}) {
    return prisma.user.findMany({
      ...arg,
      select: {
        ...this.fillable,
        ...arg?.select,
      },
    })
  }

  public getRegisteredUsers(arg: Prisma.UserFindManyArgs = {}) {
    return this.getUsers({
      ...arg,
      select: {
        ...this.fillable,
        ...arg?.select,
      },
      where: {
        role: 'user',
        ...arg?.where,
      },
    })
  }

  public createUser(user: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: {
        ...user,
      },
      select: this.fillable,
    })
  }

  public async getUserByUnique(arg: Prisma.UserFindUniqueArgs) {
    return _.omit(
      await prisma.user.findUnique({
        ...arg,
        include: {
          profile: {
            include: {
              municipality: true,
              profession: true,
            },
          },
          ...arg.include,
        },
      }),
      ['password'],
    )
  }

  public getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { ...this.fillable, password: true },
    })
  }
}
