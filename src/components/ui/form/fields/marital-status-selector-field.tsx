import {
  DynamicSelectOption,
  SelectField,
  SelectFieldProps,
} from '@/components/ui'
import React, { FC } from 'react'
import { MaritalStatus } from '@prisma/client'

export interface MaritalStatusSelectorFieldProps
  extends Omit<SelectFieldProps, 'data'> {}

const maritalStatuses: DynamicSelectOption[] = [
  {
    label: 'Soltero',
    value: MaritalStatus.single,
  },
  {
    label: 'Casado',
    value: MaritalStatus.married,
  },
  {
    label: 'Divorciado',
    value: MaritalStatus.divorced,
  },
  {
    label: 'Viudo',
    value: MaritalStatus.widowed,
  },
  {
    label: 'Separado',
    value: MaritalStatus.separated,
  },
]

export const MaritalStatusSelectorField: FC<
  MaritalStatusSelectorFieldProps
> = ({ label = 'Estado civil', ...props }) => {
  return <SelectField label={label} {...props} options={maritalStatuses} />
}
