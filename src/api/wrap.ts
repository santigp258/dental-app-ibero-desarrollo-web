import * as users from '@/api/users'
import * as patients from '@/api/patients'
import * as common from '@/api/common'

export const wrap = () => ({
  ...users,
  ...patients,
  ...common,
})
