import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query'
import { MutationFunction } from '@tanstack/query-core'
import {
  Keys,
  MutableKeys,
  PaginatedKey,
  ParamsType,
  QueryType,
} from '@/types/react-query'
import { AxiosError } from 'axios'
import { useApi } from '@/hooks/useApi'

export type Options<
  TMutationKey extends MutableKeys,
  TData = unknown,
  TError = AxiosError,
  TVariables = void,
  TContext = unknown,
> = {
  mutationKey: PaginatedKey<TMutationKey>
  invalidatedQueries?: Keys[]
  mutationParams?: ParamsType<TMutationKey>[1] | object
} & Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationKey' | 'mutationFn'
>

type MutationError = AxiosError<{
  errors?: Record<string, string[]>
  message?: string
}>

export const useTypeSafeMutation = <
  TMutationKey extends MutableKeys,
  TData = QueryType<TMutationKey>,
  TError = MutationError,
  TVariables = ParamsType<TMutationKey>[0],
  TContext = unknown,
>({
  mutationKey,
  mutationParams = {},
  invalidatedQueries = [],
  ...options
}: Options<TMutationKey, TData, TError, TVariables, TContext>) => {
  const api = useApi()
  const opts = options ? options : undefined

  const queryClient = useQueryClient()

  const mutationFn: MutationFunction<TData, TVariables> = (
    data,
  ): Promise<TData> => {
    const fn = api[mutationKey[0] as keyof typeof api]
    if (typeof fn !== 'function') {
      throw new Error(`${mutationKey[0]} is not a valid key for make a query`)
    }

    // @ts-ignore
    return fn(data as any, mutationParams as any) as Promise<TData>
  }

  return useMutation<TData, TError, TVariables, TContext>({
    mutationKey,
    mutationFn,

    async onSuccess(...data) {
      options?.onSuccess?.(...data)
      for (const query of invalidatedQueries) {
        await queryClient.invalidateQueries({ queryKey: [query] })
      }
    },
    ...opts,
  })
}
