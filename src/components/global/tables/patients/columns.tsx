import { ColumnDef } from '@tanstack/react-table'
import { profileColumns } from '@/components/global/tables/profile/columns'
import { Button, ButtonGroup } from '@/components/ui'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import * as React from 'react'

export const columns: ColumnDef<any>[] = [
  ...profileColumns,
  {
    header: 'Celular',
    cell: ({ row }) => {
      const profile = row.original.profile ?? {}
      return profile.phoneNumber ?? 'N/A'
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <ButtonGroup>
          <Button size="icon" asChild>
            <Link href={`/patients/${id}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
        </ButtonGroup>
      )
    },
  },
]
