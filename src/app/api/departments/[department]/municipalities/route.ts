import middleware from '@/api/middleware/middleware'
import getMunicipalitiesByDepartmentController from '@/api/controllers/municipalities/get-municipalities-by-department.controller'

export const GET = middleware([getMunicipalitiesByDepartmentController])
