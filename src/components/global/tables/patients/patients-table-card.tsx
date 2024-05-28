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

const PatientsTableCard: FC<PatientsTableCardProps> = ({ ...props }) => {
  return (
    <CardBadge
      title="Lista de pacientes"
      description="Desde este módulo puedes ver, editar o crear pacientes"
      className="mt-6"
      buttons={
        <ButtonGroup className="justify-between space-x-0 lg:justify-normal lg:space-x-2">
          <Button leftIcon={<Send className="h-4 w-4" />} asChild>
            <Link href="/patients/create">Crear paciente</Link>
          </Button>
        </ButtonGroup>
      }
      {...props}
    >
      <DataTableSuspense queryKey={['getPatients']} columns={columns} />
    </CardBadge>
  )
}

export default PatientsTableCard
