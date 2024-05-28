import middleware from '@/api/middleware/middleware'
import { auth } from 'auth'
import withValidation from '@/api/middleware/with-validation'
import { patientFormSchema } from '@/constants/yup-schemas/prisma.schema'
import {
  getPatientController,
  updatePatientController,
} from '@/api/controllers/patients/get-patients.controller'

export const GET = auth(middleware([getPatientController as any]) as any) as any
export const PUT = auth(
  middleware([
    withValidation(patientFormSchema),
    updatePatientController as any,
  ]) as any,
) as any
