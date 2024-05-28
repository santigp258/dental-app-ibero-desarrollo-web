import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Info } from 'lucide-react'
import React, { FC, PropsWithChildren } from 'react'

export interface CommonModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

export type ModalAlertProps = {
  variant: 'info' | 'success' | 'error'
} & CommonModalProps

const modalAlertVariants = cva('p-5 rounded-xl', {
  variants: {
    variant: {
      info: 'bg-brand-yellow-100 text-brand-purple-500 border border-brand-yellow-400 hover:opacity-90',
      success:
        'bg-emerald-200 border border-success-foreground text-emerald-700 hover:opacity-90',
      error: 'bg-red-200 border border-red-500 text-red-600 hover:opacity-90',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

export const ModalAlert: FC<ModalAlertProps> = ({
  variant,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        modalAlertVariants({ variant }),
        'max-w-xl',
        props.className,
      )}
    >
      {children}
    </div>
  )
}

export const ModalAlertTitle: FC<CommonModalProps> = ({
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'flex items-center justify-center space-x-2 text-center text-sm font-semibold',
        props.className,
      )}
    >
      <div>
        <Info className="h-4 w-4" />
      </div>
      <h3>{children}</h3>
    </div>
  )
}

export const ModalAlertDescription: FC<CommonModalProps> = ({
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'flex items-center space-x-2 text-center text-sm font-light',
        props.className,
      )}
    >
      <p>{children}</p>
    </div>
  )
}
