import { useTypeSafeQuery } from '@/hooks/use-type-safe-query'
import { SelectField, SelectFieldProps } from '@/components/ui'
import React, { FC, useMemo } from 'react'

export interface ProfessionSelectorFieldProps
  extends Omit<SelectFieldProps, 'data'> {}

export const ProfessionSelectorField: FC<ProfessionSelectorFieldProps> = ({
  label = 'Profesión',
  ...props
}) => {
  const { data } = useTypeSafeQuery({
    queryKey: ['getProfessions'],
  })

  const professions = useMemo(
    () =>
      data?.map((department) => ({
        label: department.name,
        value: department.id,
      })) ?? [],
    [data],
  )

  return <SelectField label={label} {...props} options={professions} />
}
