import middleware from '@/api/middleware/middleware'
import { auth } from 'auth'
import getPatientsController from '@/api/controllers/patients/get-patients.controller'

export const GET = auth(middleware([getPatientsController]) as any)
