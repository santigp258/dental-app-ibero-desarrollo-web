import * as React from 'react'
import { DialogProviderContext, DialogOptionsType } from './dialog-provider'

export const useDialog = () => {
  const dialogContext = React.useContext(DialogProviderContext)

  if (!dialogContext) {
    throw new Error('useDialog should be used within <DialogProvider>')
  }

  const alert = (
    title: string,
    description = '',
    opts: Omit<DialogOptionsType, 'title' | 'description'> = {},
  ) => {
    dialogContext.setIsOpen(true)
    dialogContext.setOptions({ ...opts, title, description })
  }

  const confirm = (
    title: string,
    description = '',
    opts: Omit<DialogOptionsType, 'title' | 'description'> = {},
  ) => {
    dialogContext.setIsOpen(true)
    dialogContext.setOptions({
      ...opts,
      title,
      description,
    })
  }

  const close = () => {
    dialogContext.setIsOpen(false)
    setTimeout(() => {
      dialogContext.setOptions({})
    }, 200)
  }

  return {
    alert,
    close,
    confirm,
  }
}
