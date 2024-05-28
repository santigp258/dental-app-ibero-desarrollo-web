import { ApiRequest } from '@/types/api'
import { success } from '@/api/lib/responses'
import HttpStatusCode from '@/api/lib/http-status-codes'
import prisma from '@/api/lib/prisma'

const getMunicipalitiesByDepartmentController = async (req: ApiRequest) => {
  const { searchParams } = new URL(req.url)

  const departmentId = Number(searchParams.get('departmentId'))

  const departments = await prisma.municipality.findMany({
    where: {
      departmentId: departmentId,
    },
  })

  return success(departments, HttpStatusCode.OK)
}

export default getMunicipalitiesByDepartmentController
