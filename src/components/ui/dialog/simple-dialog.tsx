import React, { FC, PropsWithChildren, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import { UseDiscloseReturn } from '@/hooks/use-disclose'

export interface SimpleDialogProps
  extends PropsWithChildren,
    Partial<UseDiscloseReturn> {
  title?: string
  description?: string
  trigger?: ReactNode
}

export const SimpleDialog: FC<SimpleDialogProps> = ({
  title,
  isOpen,
  children,
  onOpen,
  onClose,
  description,
  trigger,
}) => {
  const handleOpenChange = (val: boolean) => {
    val ? onOpen?.() : onClose?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-primary">{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
