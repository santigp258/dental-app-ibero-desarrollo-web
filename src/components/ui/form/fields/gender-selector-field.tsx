import {
  DynamicSelectOption,
  SelectField,
  SelectFieldProps,
} from '@/components/ui'
import React, { FC } from 'react'
import { Gender } from '@prisma/client'

export interface GenderSelectorFieldProps
  extends Omit<SelectFieldProps, 'data'> {}

const genders: DynamicSelectOption[] = [
  {
    label: 'Masculino',
    value: Gender.male,
  },
  {
    label: 'Femenino',
    value: Gender.female,
  },

  {
    label: 'No Binario',
    value: Gender.non_binary,
  },

  {
    label: 'Transgenero',
    value: Gender.transgender,
  },
  {
    label: 'Otro',
    value: Gender.other,
  },
]

export const GenderSelectorField: FC<GenderSelectorFieldProps> = ({
  label = 'Género',
  ...props
}) => {
  return <SelectField label={label} {...props} options={genders} />
}
