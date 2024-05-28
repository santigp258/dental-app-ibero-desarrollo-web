import { PatientType } from '@/types/models'
import { fetcher } from '@/api/lib/fetcher'

export const getPatients = async (): Promise<PatientType[] | null> => {
  return (await fetcher.get('/patients')).data?.data ?? null
}
