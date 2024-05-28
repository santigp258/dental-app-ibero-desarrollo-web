import UsersService from '@/api/services/users.service'
import { ApiRequest } from '@/types/api'
import { error, success } from '@/api/lib/responses'
import HttpStatusCode from '@/api/lib/http-status-codes'
import prisma from '@/api/lib/prisma'
import { hashPassword } from '@/api/lib/utils'
import {
  PatientFormSchemaCreateType,
  UserFormSchemaCreateType,
  UserFormSchemaType,
} from '@/constants/yup-schemas/prisma.schema'
import _ from 'lodash'

const getUsersController = async (req: ApiRequest) => {
  const userService = new UsersService()

  const loggedUser = req.auth?.account

  const users = await userService.getUsers()

  return success(
    users.filter((user) => user.id !== loggedUser?.id),
    HttpStatusCode.OK,
  )
}

export const getUserController = async (
  req: ApiRequest,
  props: { params: { id: string } },
) => {
  const userService = new UsersService()

  const user = await userService.getUserByUnique({
    where: {
      id: Number(props.params.id),
    },
  })

  if (!user) {
    return error(HttpStatusCode.NOT_FOUND)
  }

  return success(
    {
      ...user,
      profile: {
        ...user.profile,
        departmentId: (user.profile as any)?.municipality?.departmentId,
      },
    },
    HttpStatusCode.OK,
  )
}

export const getProfilePayloadFromBody = (
  body:
    | UserFormSchemaType
    | UserFormSchemaCreateType
    | PatientFormSchemaCreateType,
) => {
  return {
    ..._.omit(body, [
      'municipalityId',
      'role',
      'professionId',
      'password',
      'confirmPassword',
      'departmentId',
    ]),
    ...(body.municipalityId
      ? {
          municipality: {
            connect: {
              id: body.municipalityId as number,
            },
          },
        }
      : {}),
    ...(body.professionId
      ? {
          profession: {
            connect: {
              id: body.professionId as number,
            },
          },
        }
      : {}),
  } as any
}
export const updateUserController = async (
  req: ApiRequest<UserFormSchemaType>,
  props: { params: { id: string } },
) => {
  const userService = new UsersService()

  const user = await userService.getUserByUnique({
    where: {
      id: Number(props.params.id),
    },
  })

  if (!user) {
    return error(HttpStatusCode.NOT_FOUND)
  }

  const body = _.omit(req.validated, ['email'])

  const { role, password, confirmPassword } = body

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(props.params.id),
    },
    data: {
      role: role,
      profile: {
        update: getProfilePayloadFromBody(body as UserFormSchemaType),
      },
      ...(password ? { password: hashPassword(password) } : {}),
    },
  })

  return success(updatedUser, HttpStatusCode.OK)
}

export const createUserController = async (
  req: ApiRequest<UserFormSchemaCreateType>,
) => {
  const body = req.validated

  const { role, email, password } = body

  const userService = new UsersService()

  const user = await userService.getUserByEmail(email)

  if (user) {
    return error(HttpStatusCode.UNPROCESSABLE_ENTITY, {
      email: {
        message: 'Email en uso',
      },
    })
  }

  const createdUser = await prisma.user.create({
    data: {
      role: role as any,
      email,
      password: hashPassword(password),
      profile: {
        create: {
          ...(getProfilePayloadFromBody(body) as any),
        },
      },
    },
  })

  return success(createdUser, HttpStatusCode.OK)
}

export default getUsersController
