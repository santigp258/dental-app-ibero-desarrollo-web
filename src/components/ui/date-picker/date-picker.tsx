import React, { FC } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/popover'
import {
  DayPickerSingleProps,
  SelectSingleEventHandler,
} from 'react-day-picker'

export type DatePickerProps = Omit<DayPickerSingleProps, 'mode'> & {
  selectedDate?: Date
  onChangeDate?: SelectSingleEventHandler
  label?: string
}

export const DatePicker: FC<DatePickerProps> = ({
  selectedDate,
  onChangeDate,
  label = 'Selecciona una fecha',
  ...props
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(new Date(selectedDate), 'PPP')
          ) : (
            <span>{label}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...props}
          mode="single"
          selected={selectedDate}
          onSelect={onChangeDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
