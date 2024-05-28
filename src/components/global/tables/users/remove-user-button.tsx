import { Button, useDialog, useToast } from '@/components/ui'
import { Trash } from 'lucide-react'
import * as React from 'react'
import { FC } from 'react'
import { UserType } from '@/types/models'

const RemoveUserButton: FC<{ user: UserType }> = ({ user }) => {
  const toast = useDialog()
  const handleRemove = () => {
    toast.confirm(
      'Ten cuidado',
      `¿Está seguro de eliminar al usuario ${user.profile?.name}?`,
      {
        onConfirm() {
          toast.close()
        },
      },
    )
  }

  return (
    <Button size="icon" variant="destructive" onClick={handleRemove}>
      <Trash className="h-4 w-4" />
    </Button>
  )
}

export default RemoveUserButton
