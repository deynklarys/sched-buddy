'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Meridiem } from './utils'

export type MeridiemSelectProps = {
  id?: string
  value: Meridiem
  onChange: (meridiem: Meridiem) => void
  onRightFocus?: () => void
  onLeftFocus?: () => void
  'aria-invalid'?: boolean
}

export const TimeMeridiemSelect = React.forwardRef<HTMLButtonElement, MeridiemSelectProps>(
  ({ id, value, onChange, onLeftFocus, onRightFocus, 'aria-invalid': ariaInvalid }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowRight') onRightFocus?.()
      if (e.key === 'ArrowLeft') onLeftFocus?.()
    }

    return (
      <div className='flex h-10 items-center'>
        <Select value={value} onValueChange={(value: Meridiem) => onChange(value)}>
          <SelectTrigger
            aria-invalid={ariaInvalid}
            id={id}
            ref={ref}
            className='w-[75px]'
            onKeyDown={handleKeyDown}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent position='popper' className='z-[99999]'>
            <SelectItem value='AM'>AM</SelectItem>
            <SelectItem value='PM'>PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  },
)

TimeMeridiemSelect.displayName = 'TimeMeridiemSelect'
