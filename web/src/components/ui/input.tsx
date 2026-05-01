import * as React from 'react'

import { cn } from '@/lib/utils'
import { textBodyClassNames } from '../text'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  const fileClasses =
    'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium'
  const transitionClasses = 'shadow-xs transition-[color,box-shadow]'
  const selectionClasses =
    'selection:bg-primary selection:text-primary-foreground'

  const disabledClasses =
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted'
  const focusClasses =
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
  const errorClasses =
    'aria-invalid:border-destructive aria-invalid:ring-destructive/20'

  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        textBodyClassNames,
        'w-full min-w-0 rounded-xl px-3.5 py-2',
        'border-input border',
        'placeholder:text-border text-foreground bg-background outline-none',
        transitionClasses,
        selectionClasses,
        disabledClasses,
        focusClasses,
        errorClasses,
        fileClasses,
        className,
      )}
      {...props}
    />
  )
}

export { Input }
