import {
  DepartmentType,
  MunicipalityType,
  ProfessionType,
} from '@/types/models'
import { fetcher } from '@/api/lib/fetcher'

export const getMunicipalitiesByDepartmentId = async (
  data: { departmentId?: string } = {},
): Promise<MunicipalityType[] | null> => {
  const departmentId = data.departmentId ?? ''
  return (
    (
      await fetcher.get(
        `/departments/${departmentId}/municipalities?departmentId=${departmentId}`,
      )
    ).data?.data ?? null
  )
}

export const getDepartments = async (): Promise<DepartmentType[] | null> => {
  return (await fetcher.get('/departments')).data?.data ?? null
}

export const getProfessions = async (): Promise<ProfessionType[] | null> => {
  return (await fetcher.get('/professions')).data?.data ?? null
}
