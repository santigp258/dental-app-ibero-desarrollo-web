import middleware from '@/api/middleware/middleware'
import { auth } from 'auth'
import getPatientsController, {
  createPatientController,
} from '@/api/controllers/patients/get-patients.controller'
import withValidation from '@/api/middleware/with-validation'
import { patientFormsSchemaCreate } from '@/constants/yup-schemas/prisma.schema'

export const GET = auth(middleware([getPatientsController]) as any) as any

export const POST = auth(
  middleware([
    withValidation(patientFormsSchemaCreate),
    createPatientController as any,
  ]) as any,
) as any
