import { FieldPath, FieldValues } from 'react-hook-form'
import * as React from 'react'
import {
  DynamicSelect,
  DynamicSelectProps,
  FormField,
  FormFieldType,
  FormLabel,
} from '@/components/ui'

export interface SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends FormFieldType<TFieldValues, TName>,
    DynamicSelectProps {
  selectLabel?: string
  _select?: DynamicSelectProps
}

export const SelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  selectLabel,
  _label,
  ...props
}: SelectFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, label, labelFromName }) => {
        return (
          <>
            <FormLabel {..._label}>{label}</FormLabel>
            <DynamicSelect
              {...props}
              value={field.value}
              label={
                selectLabel ?? `Selecciona un ${(label ?? '').toLowerCase()}`
              }
              onValueChange={field.onChange}
            />
          </>
        )
      }}
    />
  )
}
