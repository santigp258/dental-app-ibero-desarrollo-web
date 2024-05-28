import {
  DatePickerField,
  Heading,
  InputField,
  InputGroup,
  SimpleAvatar,
} from '@/components/ui'
import DepartmentAndMunicipalities from '@/components/global/forms/department-and-municipalities'
import { ProfessionSelectorField } from '@/components/ui/form/fields/profession-selector-field'
import { GenderSelectorField } from '@/components/ui/form/fields/gender-selector-field'
import { IdentificationTypeSelectorField } from '@/components/ui/form/fields/identification-type-selector-field'
import { MaritalStatusSelectorField } from '@/components/ui/form/fields/marital-status-selector-field'
import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form'

export interface BasicInformationFormProps {
  isEnabledEmailField?: boolean
}

const BasicInformationForm: FC<BasicInformationFormProps> = ({
  isEnabledEmailField = false,
}) => {
  const { watch } = useFormContext()
  return (
    <div className="space-y-4">
      <Heading>Información básica</Heading>

      <div className="flex w-full justify-center ">
        <SimpleAvatar
          url={watch('image')}
          title={watch('name', 'U')}
          className="z-0 h-16 w-16"
        />
      </div>

      <InputGroup className="lg:grid-cols-1 xl:grid-cols-3">
        <InputField name="name" label="Nombre" />
        <InputField name="email" disabled={!isEnabledEmailField} />
        <InputField name="image" label="Avatar enlace" />
      </InputGroup>
      <InputGroup className="lg:grid-cols-1 xl:grid-cols-2">
        <InputField name="address" label="Dirección" />
        <InputField name="phoneNumber" label="Celular" />
      </InputGroup>
      <InputGroup className="lg:grid-cols-1 xl:grid-cols-2">
        <DepartmentAndMunicipalities />
      </InputGroup>
      <InputGroup className="lg:grid-cols-1 xl:grid-cols-2">
        <ProfessionSelectorField name="professionId" />
        <GenderSelectorField name="gender" />
      </InputGroup>
      <InputGroup className="lg:grid-cols-1 xl:grid-cols-2">
        <IdentificationTypeSelectorField name="identificationType" />
        <InputField name="identification" label="Identificación" />
      </InputGroup>

      <InputGroup className="lg:grid-cols-1 xl:grid-cols-2">
        <DatePickerField name="birthDate" label="Fecha de nacimiento" />
        <MaritalStatusSelectorField name="maritalStatus" />
      </InputGroup>
    </div>
  )
}

export default BasicInformationForm
