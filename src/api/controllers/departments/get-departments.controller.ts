import { ApiRequest } from '@/types/api'
import { success } from '@/api/lib/responses'
import HttpStatusCode from '@/api/lib/http-status-codes'
import prisma from '@/api/lib/prisma'

const getDepartmentsController = async (req: ApiRequest) => {
  const departments = await prisma.department.findMany()

  return success(departments, HttpStatusCode.OK)
}

export default getDepartmentsController
