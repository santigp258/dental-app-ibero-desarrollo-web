import {
  getUserController,
  updateUserController,
} from '@/api/controllers/users/get-users.controller'
import middleware from '@/api/middleware/middleware'
import { auth } from 'auth'
import withValidation from '@/api/middleware/with-validation'
import { userFormSchema } from '@/constants/yup-schemas/prisma.schema'

export const GET = auth(middleware([getUserController as any]) as any)
export const PUT = auth(
  middleware([
    withValidation(userFormSchema),
    updateUserController as any,
  ]) as any,
)
