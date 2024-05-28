import {
  DynamicSelectOption,
  SelectField,
  SelectFieldProps,
} from '@/components/ui'
import React, { FC } from 'react'
import { IdentificationType } from '@prisma/client'

export interface IdentificationTypeSelectorFieldProps
  extends Omit<SelectFieldProps, 'data'> {}

const genders: DynamicSelectOption[] = [
  {
    label: 'CC',
    value: IdentificationType.cc,
  },
  {
    label: 'TI',
    value: IdentificationType.ti,
  },

  {
    label: 'RCN',
    value: IdentificationType.rcn,
  },
  {
    label: 'CE',
    value: IdentificationType.ce,
  },
]

export const IdentificationTypeSelectorField: FC<
  IdentificationTypeSelectorFieldProps
> = ({ label = 'Tipo de identificación', ...props }) => {
  return <SelectField label={label} {...props} options={genders} />
}
