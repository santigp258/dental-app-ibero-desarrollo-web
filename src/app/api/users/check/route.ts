import middleware from '@/api/middleware/middleware'
import withValidation from '@/api/middleware/with-validation'
import CheckCredentialsController from '@/api/controllers/users/check-credentials.controller'
import { checkCredentialsSchema } from '@/constants/yup-schemas/users.schema'

export const POST = middleware([
  withValidation(checkCredentialsSchema),
  CheckCredentialsController,
]) as any
