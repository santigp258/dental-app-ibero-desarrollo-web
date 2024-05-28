import { INTERNAL_API_URI } from '@/api/lib/fetcher'
import { UserType } from '@/types/models'
import { CheckCredentialsSchemaType } from '@/types/schemas'
import { CommonResponse } from '@/types/api'
import axios from 'axios'

export const checkCredentials = async (
  data: CheckCredentialsSchemaType,
): Promise<CommonResponse<UserType | null>> => {
  return (
    (
      await axios
        .create({ baseURL: INTERNAL_API_URI })
        .post('/users/check', data)
    ).data ?? null
  )
}
