import UsersService from '@/api/services/users.service'
import { ApiRequest } from '@/types/api'
import { CheckCredentialsSchemaType } from '@/types/schemas'
import { hashPassword } from '@/api/lib/utils'
import { error, success } from '@/api/lib/responses'
import { omit } from 'lodash'
import HttpStatusCode from '@/api/lib/http-status-codes'

const checkCredentialsController = async (req: ApiRequest) => {
  const userService = new UsersService()

  const payload = req.validated as unknown as CheckCredentialsSchemaType

  const user = await userService.getUserByEmail(payload.email)

  const hashedPassword = hashPassword(payload.password)

  if (user && user.password === hashedPassword) {
    return success(omit(user, 'password'), HttpStatusCode.OK)
  }

  return error(HttpStatusCode.UNAUTHORIZED, {
    email: {
      message: 'Email o contraseña incorrectos',
    },
  })
}

export default checkCredentialsController
