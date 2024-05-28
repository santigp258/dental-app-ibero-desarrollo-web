import { useTypeSafeQuery } from '@/hooks/use-type-safe-query'
import { SelectField, SelectFieldProps } from '@/components/ui'
import React, { FC, useMemo } from 'react'

export interface MunicipalitySelectorFieldProps
  extends Omit<SelectFieldProps, 'data'> {
  departmentId?: string
}

export const MunicipalitySelectorField: FC<MunicipalitySelectorFieldProps> = ({
  departmentId,
  label = 'Municipio',
  ...props
}) => {
  const { data } = useTypeSafeQuery({
    queryKey: ['getMunicipalitiesByDepartmentId', departmentId],
    queryParams: {
      departmentId,
    },
    enabled: !!departmentId,
  })

  const municipalities = useMemo(
    () =>
      data?.map((department) => ({
        label: department.name,
        value: department.id,
      })) ?? [],
    [data],
  )

  return <SelectField label={label} {...props} options={municipalities} />
}
