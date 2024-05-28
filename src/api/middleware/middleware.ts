import { ApiRequest, MiddlewareHandlerType } from '@/types/api'

import { v4 as uuidv4 } from 'uuid'
import { logger } from '@/api/lib/logger'
import { error } from '@/api/lib/responses'
import HttpStatusCode from '@/api/lib/http-status-codes'

const middleware = (args: MiddlewareHandlerType[]) => {
  return async (req: ApiRequest, params: Record<any, any>) => {
    const id = uuidv4()
    let index = 0

    let isNext = false

    const next = () => {
      return id
    }

    do {
      logger.debug(`[${id}] Start middleware index: `, index)
      const handler = args[index]

      if (!handler) {
        return error(HttpStatusCode.NOT_IMPLEMENTED)
      }

      const resp = await handler(req, params, next)

      isNext = resp === id
      if (!isNext) {
        return resp
      }
      index++
    } while (isNext && index < args.length)

    return error(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Unknown error')
  }
}

export default middleware
