import Image from 'next/image'

import backgroundImage from '@/images/background-auth.jpg'
import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui'

interface BeautyContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  _container?: React.HTMLAttributes<HTMLDivElement>
}

export const BeautyContainer: React.FC<BeautyContainerProps> = ({
  children,
  _container,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn('relative pb-20 pt-10 sm:py-24', props.className)}
    >
      <div className="absolute inset-x-0 -bottom-14 -top-48 overflow-hidden bg-green-50">
        <Image
          className="absolute left-0 top-0 h-full w-full"
          src={backgroundImage}
          alt={` background`}
          width={918}
          height={1495}
          priority
          unoptimized
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative" {..._container}>
        {children}
      </Container>
    </div>
  )
}
