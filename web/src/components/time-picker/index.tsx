'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { TimePickerInput } from './time-picker-input'
import { TimeMeridiemSelect } from './meridiem-select'
import { Meridiem } from './utils'

type Time = {
  hours: number | undefined
  minutes: number | undefined
  meridiem: Meridiem
}

interface TimePickerProps {
  value: Time
  onChange: (time: Time) => void
  'aria-invalid'?: boolean
}

export function TimePicker({
  value,
  onChange,
  'aria-invalid': ariaInvalid,
}: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const periodRef = React.useRef<HTMLButtonElement>(null)

  const handleHourChange = (hours: string) => {
    onChange({
      hours: parseInt(hours, 10),
      minutes: value.minutes,
      meridiem: value.meridiem,
    })
  }

  const handleMinuteChange = (minutes: string) => {
    onChange({
      hours: value.hours,
      minutes: parseInt(minutes, 10),
      meridiem: value.meridiem,
    })
  }

  const handleMeridiemChange = (meridiem: Meridiem) => {
    onChange({
      hours: value.hours,
      minutes: value.minutes,
      meridiem,
    })
  }

  return (
    <div className='flex items-end gap-2 *:flex *:flex-col *:items-center *:gap-1 *:text-center'>
      <div>
        <Label htmlFor='hours'>Hours</Label>
        <TimePickerInput
          id='hours'
          picker='12hours'
          value={
            value.hours !== undefined
              ? String(value.hours).padStart(2, '0')
              : ''
          }
          placeholder='12'
          onChange={handleHourChange}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div>
        <Label htmlFor='minutes'>Minutes</Label>
        <TimePickerInput
          id='minutes'
          picker='minutes'
          value={
            value.minutes !== undefined
              ? String(value.minutes).padStart(2, '0')
              : ''
          }
          placeholder='00'
          onChange={handleMinuteChange}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>
      <div>
        <Label htmlFor='meridiem'>Period</Label>
        <TimeMeridiemSelect
          id='meridiem'
          meridiem={value.meridiem}
          onChange={handleMeridiemChange}
          ref={periodRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
    </div>
  )
}
