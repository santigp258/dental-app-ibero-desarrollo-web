'use client'
import {
  Button,
  ButtonGroup,
  CardBadge,
  CardBadgeProps,
  DataTableSuspense,
} from '@/components/ui'
import { columns } from './columns'

import { FC } from 'react'
import { Send } from 'lucide-react'
import Link from 'next/link'

interface PatientsTableCardProps extends Partial<CardBadgeProps> {}

const UsersTableCard: FC<PatientsTableCardProps> = ({ ...props }) => {
  return (
    <CardBadge
      title="Lista de usuarios"
      description="Desde este módulo puedes ver, editar o crear usuarios"
      className="mt-6"
      buttons={
        <ButtonGroup className="justify-between space-x-0 lg:justify-normal lg:space-x-2">
          <Button leftIcon={<Send className="h-4 w-4" />} asChild>
            <Link href="/admin/users/create">Crear usuario</Link>
          </Button>
        </ButtonGroup>
      }
      {...props}
    >
      <DataTableSuspense queryKey={['getUsers']} columns={columns} />
    </CardBadge>
  )
}

export default UsersTableCard
