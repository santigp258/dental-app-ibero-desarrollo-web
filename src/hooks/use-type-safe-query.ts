import { useQuery } from '@tanstack/react-query'
import {
  GetterKeys,
  QueryType,
  UseTypeSafeQueryOptions,
} from '@/types/react-query'
import { useApi } from '@/hooks/useApi'
import {
  useSuspenseQuery as useSuspenseQueryHook,
  useQuery as useQueryHook,
} from '@tanstack/react-query'

export const useTypeSafeQuery = <
  TQueryKey extends GetterKeys,
  TQueryFnData = unknown,
  TError = unknown,
  TData = QueryType<TQueryKey>,
>({
  queryKey,
  queryParams = {},
  useSuspenseQuery = false,
  ...options
}: UseTypeSafeQueryOptions<TQueryKey, TQueryFnData, TError, TData> & {
  useSuspenseQuery?: boolean
}) => {
  const api = useApi()
  const opts = options ? options : ({} as any)

  const useQuery = useSuspenseQuery ? useSuspenseQueryHook : useQueryHook

  return useQuery<QueryType<TQueryKey>>({
    queryKey,
    queryFn: () => {
      const fn = api[queryKey[0]]
      if (typeof fn !== 'function') {
        throw new Error(`${queryKey[0]} is not a valid key for make a query`)
      }

      // @ts-ignore
      return fn(queryParams ?? {})
    },
    ...opts,
  })
}
