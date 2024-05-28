import {
  DepartmentSelectorField,
  MunicipalitySelectorField,
} from '@/components/ui'
import { useFormContext } from 'react-hook-form'

const DepartmentAndMunicipalities = () => {
  const { watch } = useFormContext()

  return (
    <>
      <DepartmentSelectorField name="departmentId" />

      <MunicipalitySelectorField
        name="municipalityId"
        departmentId={watch('departmentId')}
      />
    </>
  )
}

export default DepartmentAndMunicipalities
