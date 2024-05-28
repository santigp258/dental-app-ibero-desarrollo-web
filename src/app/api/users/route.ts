import middleware from '@/api/middleware/middleware'
import { auth } from 'auth'
import getUsersController, {
  createUserController,
} from '@/api/controllers/users/get-users.controller'
import withValidation from '@/api/middleware/with-validation'
import { userFormsSchemaCreate } from '@/constants/yup-schemas/prisma.schema'

export const GET = auth(middleware([getUsersController]) as any) as any

export const POST = auth(
  middleware([
    withValidation(userFormsSchemaCreate),
    createUserController as any,
  ]) as any,
) as any
