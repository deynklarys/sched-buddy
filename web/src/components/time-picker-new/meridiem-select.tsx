'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Meridiem, display12HourValue, setDateByType } from './utils'

export interface MeridiemSelectProps {
  id?: string
  meridiem: Meridiem
  onChange: (meridiem: Meridiem) => void
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

export const TimeMeridiemSelect = React.forwardRef<
  HTMLButtonElement,
  MeridiemSelectProps
>(({ id, meridiem, onChange, onLeftFocus, onRightFocus }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight') onRightFocus?.()
    if (e.key === 'ArrowLeft') onLeftFocus?.()
  }

  return (
    <div className='flex h-10 items-center'>
      <Select
        value={meridiem}
        onValueChange={(value: Meridiem) => onChange(value)}
      >
        <SelectTrigger
          id={id}
          ref={ref}
          className='w-[80px]'
          onKeyDown={handleKeyDown}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent position='popper'>
          <SelectItem value='AM'>AM</SelectItem>
          <SelectItem value='PM'>PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
})

TimeMeridiemSelect.displayName = 'TimeMeridiemSelect'
