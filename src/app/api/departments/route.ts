import middleware from '@/api/middleware/middleware'
import getDepartmentsController from '@/api/controllers/departments/get-departments.controller'

export const GET = middleware([getDepartmentsController])
