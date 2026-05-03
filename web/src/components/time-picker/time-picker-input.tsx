import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'
import React from 'react'
import {
  TimePickerType,
  getArrowByType,
  getValid12Hour,
  getValidHour,
  getValidMinuteOrSecond,
} from './utils'

export interface TimePickerInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  picker: TimePickerType
  value: string
  placeholder?: string
  onChange: (value: string) => void
  onRightFocus?: () => void
  onLeftFocus?: () => void
}
const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = 'tel',
      value,
      placeholder = '',
      id,
      name,
      onChange,
      onKeyDown,
      picker,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref,
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false)
    const [prevIntKey, setPrevIntKey] = React.useState<string>('0')

    /**
     * allow the user to enter the second digit within 2 seconds
     * otherwise start again with entering first digit
     */
    React.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false)
        }, 2000)

        return () => clearTimeout(timer)
      }
    }, [flag])

    const calculateNewValue = (key: string) => {
      if (picker === '12hours') {
        if (flag && value.slice(1, 2) === '1' && prevIntKey === '0')
          return '0' + key
      }
      return !flag ? '0' + key : value.slice(1, 2) + key
    }

    /* Listen to specific key presses when the input is selected */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      /* If its a tab, don't do anything, it will move to the next input by default */
      if (e.key === 'Tab') return

      /* Prevent default actions for keys (E.g: left/right arrow will move thee cursor to the previous/next character in the input) */
      e.preventDefault()

      /* Programmatically focus on the left or right input */
      if (e.key === 'ArrowRight') onRightFocus?.()
      if (e.key === 'ArrowLeft') onLeftFocus?.()

      /* Increment/Decrement the time */
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        const step = e.key === 'ArrowUp' ? 1 : -1
        const newValue = getArrowByType(value || '00', step, picker)
        if (flag) setFlag(false)
        onChange(newValue)
      }

      /* Numeric characters will modify the value of the input */
      if (e.key >= '0' && e.key <= '9') {
        if (picker === '12hours') setPrevIntKey(e.key)
        const newValue = calculateNewValue(e.key)
        if (flag) onRightFocus?.()
        setFlag((prev) => !prev)

        /* Validate the values. If invalid, bring it to the nearest valid value */
        let validatedValue = '0'
        if (picker === 'seconds' || picker === 'minutes') {
          validatedValue = getValidMinuteOrSecond(newValue)
        } else if (picker === 'hours') {
          validatedValue = getValidHour(newValue)
        } else if (picker === '12hours') {
          validatedValue = getValid12Hour(newValue)
        } else {
          validatedValue = newValue
        }

        onChange(validatedValue)
      }

      /* Other key presses are ignored */
    }

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          'w-[52px] text-center tabular-nums caret-transparent [&::-webkit-inner-spin-button]:appearance-none',
          className,
        )}
        value={value}
        placeholder={placeholder}
        onChange={(e) => e.preventDefault()}
        type={type}
        inputMode='decimal'
        onKeyDown={(e) => {
          onKeyDown?.(e)
          handleKeyDown(e)
        }}
        {...props}
      />
    )
  },
)

TimePickerInput.displayName = 'TimePickerInput'

export { TimePickerInput }
