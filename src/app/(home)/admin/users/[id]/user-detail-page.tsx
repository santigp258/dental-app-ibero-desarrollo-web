'use client'
import { useTypeSafeQuery } from '@/hooks/use-type-safe-query'
import { Loader } from '@/components/ui'
import { FC } from 'react'
import UsersForm from '@/components/global/forms/users-form'
import _ from 'lodash'

export interface UserDetailPageProps {
  userId?: string
}

const UserDetailPage: FC<UserDetailPageProps> = ({ userId }) => {
  const { data, isError, isLoading } = useTypeSafeQuery({
    queryKey: ['getUser', userId],
    queryParams: {
      userId,
    },
  })

  if (isLoading) {
    return <Loader className="h-125" />
  }

  if (isError || !data) {
    return <>No se encontró el usuario</>
  }

  return (
    <UsersForm
      initialData={{
        ..._.omit(data, ['profile']),
        ...data?.profile,
        id: data.id,
      }}
      isCreateForm={false}
    />
  )
}

export default UserDetailPage
