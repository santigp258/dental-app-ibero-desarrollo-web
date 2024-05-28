'use client'
import { Button, Card, CardContent, Form, useToast } from '@/components/ui'
import React, { FC, useMemo } from 'react'
import { SubmitHandler } from 'react-hook-form'
import BasicInformationForm from './basic-information-form'
import { useTypeSafeMutation } from '@/hooks/use-type-safe-mutation'
import { useForm } from '@/hooks/use-form'
import {
  patientFormSchema,
  patientFormsSchemaCreate,
  UserFormSchemaType,
} from '@/constants/yup-schemas/prisma.schema'
import { useNavigation } from '@/hooks/use-navigation'

export interface PatientsFormProps {
  isCreateForm?: boolean
  initialData?: Record<any, any>
}

const PatientsForm: FC<PatientsFormProps> = ({
  isCreateForm = true,
  initialData,
}) => {
  const form = useForm<UserFormSchemaType>({
    schema: isCreateForm ? patientFormsSchemaCreate : patientFormSchema,
    defaultValues: {
      name: '',
      address: '',
      birthDate: null,
      password: '',
      confirmPassword: '',
      departmentId: null,
      email: '',
      identification: '',
      identificationType: null,
      image: null,
      maritalStatus: null,
      municipalityId: null,
      phoneNumber: null,
      ...useMemo(() => initialData, [initialData]),
    },
  })

  const toast = useToast()

  const { router } = useNavigation()

  const { isPending, mutate, mutateAsync } = useTypeSafeMutation({
    mutationKey: [isCreateForm ? 'createPatient' : 'updatePaciente'],
    invalidatedQueries: ['getPatients'],
    onSuccess() {
      toast.success(
        '¡Perfecto!',
        isCreateForm
          ? 'Se ha creado el paciente'
          : 'Se ha actualizado el paciente',
      )

      if (isCreateForm) {
        router.replace('/patients')
      }
    },
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    await mutateAsync(data, {
      onError(e) {
        throw e
      },
    })
  }

  return (
    <Card>
      <CardContent className="py-8">
        <Form {...form}>
          <div className="space-y-6">
            <BasicInformationForm isEnabledEmailField={isCreateForm} />

            <div className="flex w-full justify-end">
              <Button
                isLoading={isPending}
                onClick={form.handleSubmit(onSubmit, console.log)}
              >
                {isCreateForm ? 'Crear' : 'Actualizar'}
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PatientsForm
