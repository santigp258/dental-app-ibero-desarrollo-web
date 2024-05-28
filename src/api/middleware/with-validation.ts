import { error } from '@/api/lib/responses'
import { ApiRequest } from '@/types/api'
import HttpStatusCode from '@/api/lib/http-status-codes'

import { parseBody, parseErrorSchema } from '@/api/lib/utils'
import { logger } from '@/api/lib/logger'
import * as Yup from 'yup'

const withValidation = (schema?: Yup.AnyObjectSchema) => {
  return async (
    req: ApiRequest,
    params: Record<any, any>,
    next: CallableFunction,
  ) => {
    logger.debug('STARTING VALIDATION MIDDLEWARE')

    // no validate schema if doesn't exist
    if (!schema) {
      return next()
    }

    try {
      const json = await req.json()

      const body = parseBody(json)

      // eslint-disable-next-line require-atomic-updates
      req.validated = await schema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      })

      return next()
    } catch (e: any) {
      return error(
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        parseErrorSchema(e, true),
      )
    }
  }
}

export default withValidation
