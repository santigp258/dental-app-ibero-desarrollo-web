import { useTypeSafeQuery } from '@/hooks/use-type-safe-query'
import {
  DynamicSelectOption,
  SelectField,
  SelectFieldProps,
} from '@/components/ui'
import React, { FC, useMemo } from 'react'

export interface DepartmentSelectorFieldProps
  extends Omit<SelectFieldProps, 'data'> {}

export const DepartmentSelectorField: FC<DepartmentSelectorFieldProps> = ({
  label = 'Departamento',
  ...props
}) => {
  const { data } = useTypeSafeQuery({
    queryKey: ['getDepartments'],
  })

  const departments = useMemo(
    () =>
      data?.map((department) => ({
        label: department.name,
        value: `${department.id}`,
      })) ?? [],
    [data],
  )

  return <SelectField label={label} {...props} options={departments} />
}
