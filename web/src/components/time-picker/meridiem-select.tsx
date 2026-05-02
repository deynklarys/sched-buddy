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
  setMeridiem: (m: Meridiem) => void
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

export const TimeMeridiemSelect = React.forwardRef<
  HTMLButtonElement,
  MeridiemSelectProps
>(
  (
    { id, meridiem, setMeridiem, date, setDate, onLeftFocus, onRightFocus },
    ref,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowRight') onRightFocus?.()
      if (e.key === 'ArrowLeft') onLeftFocus?.()
    }

    const handleValueChange = (value: Meridiem) => {
      setMeridiem(value)

      /**
       * trigger an update whenever the user switches between AM and PM;
       * otherwise user must manually change the hour each time
       */
      if (date) {
        const tempDate = new Date(date)
        const hours = display12HourValue(date.getHours())
        setDate(
          setDateByType(
            tempDate,
            hours.toString(),
            '12hours',
            meridiem === 'AM' ? 'PM' : 'AM',
          ),
        )
      }
    }

    return (
      <div className='flex h-10 items-center'>
        <Select
          value={meridiem}
          onValueChange={(value: Meridiem) => handleValueChange(value)}
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
  },
)

TimeMeridiemSelect.displayName = 'TimeMeridiemSelect'
