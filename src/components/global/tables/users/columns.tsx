import { ColumnDef } from '@tanstack/react-table'
import { profileColumns } from '@/components/global/tables/profile/columns'
import { Button, ButtonGroup } from '@/components/ui'
import { Edit, Trash } from 'lucide-react'
import * as React from 'react'
import Link from 'next/link'
import { UserType } from '@/types/models'
import RemoveUserButton from '@/components/global/tables/users/remove-user-button'

export const columns: ColumnDef<UserType>[] = [
  ...(profileColumns as any),
  {
    accessorKey: 'role',
    header: 'Rol',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <ButtonGroup>
          <RemoveUserButton user={row.original} />

          <Button size="icon" asChild>
            <Link href={`/admin/users/${id}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
        </ButtonGroup>
      )
    },
  },
]
