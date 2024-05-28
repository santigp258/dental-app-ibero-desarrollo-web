'use client'
import { FieldPath, FieldValues } from 'react-hook-form'
import * as React from 'react'
import {
  Input,
  InputProps,
  FormField,
  FormFieldType,
  FormLabel,
} from '@/components/ui'

export interface InputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends FormFieldType<TFieldValues, TName> {
  _input?: InputProps & React.RefAttributes<HTMLInputElement>
}

export const InputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  _input,
  ...props
}: InputFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, label, fieldContext }) => {
        return (
          <>
            <FormLabel>{label}</FormLabel>
            <Input {...field} {..._input} id={fieldContext.formItemId} />
          </>
        )
      }}
    />
  )
}
