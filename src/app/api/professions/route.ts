import middleware from '@/api/middleware/middleware'
import getProfessionsController from '@/api/controllers/professions/get-professions.controller'

export const GET = middleware([getProfessionsController])
