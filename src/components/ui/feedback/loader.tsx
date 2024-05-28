import React, { FC } from 'react'
import { cn } from '@/lib/utils'

export const Loader: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      className={cn(
        'flex h-screen items-center justify-center',
        props.className,
      )}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  )
}
