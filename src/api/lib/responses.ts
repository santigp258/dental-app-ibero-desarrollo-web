import HttpStatusCode from '@/api/lib/http-status-codes'
import { NextResponse } from 'next/server'

export const success = (
  data: Record<string, any> | string,
  statusCode: HttpStatusCode,
) => {
  const status = statusCode ? statusCode : 200
  return NextResponse.json(
    { message: HttpStatusCode[status], data, status },
    { status },
  )
}

export const error = (
  statusCode: HttpStatusCode,
  errors?: Record<string, any> | string,
) => {
  const status = statusCode ? statusCode : 500
  return NextResponse.json(
    {
      message: HttpStatusCode[status],
      status,
      errors,
    },
    { status: status },
  )
}
