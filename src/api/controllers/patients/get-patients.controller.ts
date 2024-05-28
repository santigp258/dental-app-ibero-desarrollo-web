import { ApiRequest } from '@/types/api'
import { success } from '@/api/lib/responses'
import HttpStatusCode from '@/api/lib/http-status-codes'
import prisma from '@/api/lib/prisma'

const getPatientsController = async (req: ApiRequest) => {
  const patients = await prisma.patient.findMany({ include: { profile: true } })

  return success(patients, HttpStatusCode.OK)
}

export default getPatientsController
