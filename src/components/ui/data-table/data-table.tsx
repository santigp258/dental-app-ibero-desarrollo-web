'use client'

import * as React from 'react'
import { FC, Fragment, ReactNode, Suspense } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as TableType,
  TableOptions,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableVariantProps,
} from '@/components/ui/table'
import { DataTablePagination, Skeleton } from '@/components/ui'
import { useTypeSafeQuery } from '@/hooks/use-type-safe-query'
import { GetterKeys, PaginatedKey } from '@/types/react-query'

export interface WithTable {
  table: TableType<Record<any, any>>
}

export type RenderComponentDataTableHandler = (context: WithTable) => ReactNode

export interface DataTableProps<D extends Record<any, any>>
  extends TableVariantProps {
  data: D[]
  isLoading?: boolean
  columns: ColumnDef<D>[]
  tableOptions?: Partial<TableOptions<Record<any, any>>>
  renderHeader?: RenderComponentDataTableHandler
  renderFooter?: RenderComponentDataTableHandler
  variantClassName?: string
}

export interface DataTableSuspenseProps
  extends Omit<DataTableProps<any>, 'data'> {
  queryKey: PaginatedKey<GetterKeys>
}

const DatatableSuspenseWrapper: FC<DataTableSuspenseProps> = ({
  queryKey,
  ...props
}) => {
  const { data } = useTypeSafeQuery({
    queryKey: queryKey,
    useSuspenseQuery: true,
  })

  return <DataTable {...props} data={data ?? []} />
}

export const DataTableSuspense: FC<DataTableSuspenseProps> = (props) => {
  return (
    <Suspense fallback={<DataTable {...props} data={[]} isLoading={true} />}>
      <DatatableSuspenseWrapper {...props} isLoading={false} />
    </Suspense>
  )
}

export const DataTableLoading: FC<WithTable> = ({ table }) => {
  return (
    <>
      {Array.from({ length: 5 }).map((o, index) => (
        <TableRow key={index}>
          {Array.from({ length: table.getAllColumns().length }).map((a, i) => (
            <TableCell key={i}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export const DataTable = <D extends Record<any, any>>({
  data = [],
  columns = [],
  tableOptions,
  renderHeader,
  renderFooter,
  variant,
  variantClassName,
  isLoading = false,
}: DataTableProps<D>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    ...tableOptions,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...tableOptions?.state,
    },
  })

  return (
    <div className="w-full">
      {renderHeader ? (
        <div className="flex items-center py-4">{renderHeader({ table })} </div>
      ) : null}

      <div className="rounded-md">
        <Table variant={variant} className={variantClassName}>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                <DataTableLoading table={table} />
              </>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className={variantClassName}
                      variant={variant}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className="h-24 text-center"
                    >
                      No hay resultados.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {renderFooter ? (
        renderFooter({ table })
      ) : (
        <DataTablePagination table={table} className="mt-2" />
      )}
    </div>
  )
}
