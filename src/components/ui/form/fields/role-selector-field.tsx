import {
  DynamicSelectOption,
  SelectField,
  SelectFieldProps,
} from '@/components/ui'
import React, { FC } from 'react'
import { Role } from '@prisma/client'

export interface RoleSelectorFieldProps
  extends Omit<SelectFieldProps, 'data'> {}

const roles: DynamicSelectOption[] = [
  {
    label: 'Admin',
    value: Role.admin,
  },
  {
    label: 'Usuario',
    value: Role.user,
  },
]

export const RoleSelectorField: FC<RoleSelectorFieldProps> = ({
  label = 'Rol',
  ...props
}) => {
  return <SelectField label={label} {...props} options={roles} />
}
