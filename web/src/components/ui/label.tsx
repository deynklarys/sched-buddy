'use client'

import * as React from 'react'
import { Label as LabelPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { textSubClassNames } from '../text'

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const errorClasses = 'aria-invalid:text-destructive'

  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(
        errorClasses,
        'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        textSubClassNames,
        'flex items-center gap-2 select-none',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
