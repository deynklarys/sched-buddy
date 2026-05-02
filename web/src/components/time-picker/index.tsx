'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { TimePickerInput } from './time-picker-input'
import { TimeMeridiemSelect } from './meridiem-select'
import { Meridiem } from './utils'

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const [meridiem, setMeridiem] = React.useState<Meridiem>('PM')

  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const periodRef = React.useRef<HTMLButtonElement>(null)

  return (
    <div className='flex items-end gap-2 *:flex *:flex-col *:items-center *:gap-1 *:text-center'>
      <div>
        <Label htmlFor='hours'>Hours</Label>
        <TimePickerInput
          id='hours'
          picker='12hours'
          meridiem={meridiem}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div>
        <Label htmlFor='minutes'>Minutes</Label>
        <TimePickerInput
          picker='minutes'
          id='minutes'
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>
      <div>
        <Label htmlFor='meridiem'>Period</Label>
        <TimeMeridiemSelect
          id='meridiem'
          meridiem={meridiem}
          setMeridiem={setMeridiem}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
    </div>
  )
}
