import * as React from 'react'

import { cn } from '@/lib/utils'
import { textBodyClassNames } from '../text'

export const classNames = {
  file: 'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
  transition: 'shadow-xs transition-[color,box-shadow]',
  selection: 'selection:bg-primary selection:text-primary-foreground',
  disabled:
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
  focus: 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  error: 'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
  base: 'w-full min-w-0 rounded-xl px-3.5 py-2 border-input border placeholder:text-border text-foreground-100 bg-background outline-none',
}

export const inputClassNames = cn(Object.values(classNames), textBodyClassNames)

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input type={type} data-slot='input' className={cn(inputClassNames, className)} {...props} />
  )
}

export { Input }
