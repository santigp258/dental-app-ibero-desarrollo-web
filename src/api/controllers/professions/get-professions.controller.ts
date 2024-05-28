import { ApiRequest } from '@/types/api'
import { success } from '@/api/lib/responses'
import HttpStatusCode from '@/api/lib/http-status-codes'
import prisma from '@/api/lib/prisma'

const getProfessionsController = async (req: ApiRequest) => {
  const professions = await prisma.profession.findMany()

  return success(professions, HttpStatusCode.OK)
}

export default getProfessionsController
