import { ColumnDef } from '@tanstack/react-table'
import { CheckboxPrimitive, SimpleAvatar } from '@/components/ui'
import * as React from 'react'
import { WithProfileType } from '@/types/models'

export const profileColumns: ColumnDef<WithProfileType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <CheckboxPrimitive
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <CheckboxPrimitive
        className="border-gray-400 data-[state=checked]:border-white"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Imagen',
    header: 'Image',
    cell: ({ row }) => {
      const profile = row.original.profile ?? {}
      return (
        <div className="flex space-x-2 text-primary">
          <SimpleAvatar url={profile.image ?? ''} title={profile?.name ?? ''} />
        </div>
      )
    },
  },

  {
    header: 'Nombre',
    cell: ({ row }) => {
      const profile = row.original.profile ?? {}
      return profile.name ?? 'N/A'
    },
  },
  {
    header: 'Correo',
    cell: ({ row }) => {
      const profile = row.original.profile ?? {}

      return profile.email ?? 'N/A'
    },
  },
]
