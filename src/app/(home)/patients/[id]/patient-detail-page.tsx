'use client'
import { useTypeSafeQuery } from '@/hooks/use-type-safe-query'
import { Loader } from '@/components/ui'
import { FC } from 'react'

import _ from 'lodash'
import PatientsForm from '@/components/global/forms/patients-form'

export interface PatientDetailPageProps {
  patientId?: string
}

const PatientDetailPage: FC<PatientDetailPageProps> = ({ patientId }) => {
  const { data, isError, isLoading } = useTypeSafeQuery({
    queryKey: ['getPatient', patientId],
    queryParams: {
      patientId,
    },
  })

  if (isLoading) {
    return <Loader className="h-125" />
  }

  if (isError || !data) {
    return <>No se encontró el paciente</>
  }

  return (
    <PatientsForm
      initialData={{
        ..._.omit(data, ['profile']),
        ...data?.profile,
        id: data.id,
      }}
      isCreateForm={false}
    />
  )
}

export default PatientDetailPage
