'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { FC, PropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface DynamicSelectOption {
  label: string
  value: string | number
}

export interface DynamicSelectProps
  extends Omit<PropsWithoutRef<typeof Select>, 'value'> {
  label?: string
  selectLabel?: string
  options?: DynamicSelectOption[]
  onValueChange?: (value: string) => void
  value?: string
}

export const DynamicSelect: FC<DynamicSelectProps> = ({
  options = [],
  label,
  selectLabel,
  value,
  onValueChange,
  ...props
}) => {
  return (
    <Select
      value={value ? `${value}` : value}
      onValueChange={onValueChange}
      {...props}
    >
      <SelectTrigger
        className={cn(
          'w-full text-left font-normal hover:text-foreground',
          !value && 'text-muted-foreground',
        )}
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="max-h-[10rem] overflow-y-auto">
        <SelectGroup>
          <SelectLabel>{label ?? selectLabel}</SelectLabel>
          {options?.map((option, idx) => (
            <SelectItem value={`${option.value}`} key={idx}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
