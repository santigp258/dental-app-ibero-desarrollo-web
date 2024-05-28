import { PatientType } from '@/types/models'
import { fetcher } from '@/api/lib/fetcher'

export const getPatients = async (): Promise<PatientType[] | null> => {
  return (await fetcher.get('/patients')).data?.data ?? null
}

export const getPatient = async (params: {
  patientId: string
}): Promise<PatientType | null> => {
  return (await fetcher.get(`/patients/${params.patientId}`)).data?.data ?? null
}

// TODO: type data using yup schema type
export const updatePaciente = async (
  data: any,
): Promise<PatientType | null> => {
  return (await fetcher.put(`/patients/${data.id}`, data)).data?.data ?? null
}

// TODO: type data using yup schema type
export const createPatient = async (data: any): Promise<PatientType | null> => {
  return (await fetcher.post('/patients', data)).data?.data ?? null
}
