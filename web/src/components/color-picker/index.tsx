import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  ColorArea,
  ColorField,
  ColorPicker as Picker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  SliderTrack,
} from '@/components/ui/color'
import { parseColor, Input as ColorInput, Color } from 'react-aria-components'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function ColorPicker({
  hex,
  onHexChange,
}: {
  hex: string
  onHexChange: (hex: string) => void
}) {
  const [open, setOpen] = useState(false)

  const onColorChange = (color: Color) => {
    onHexChange(`#${color.toHexInt().toString(16).padStart(6, '0')}`)
  }
  return (
    <Picker value={parseColor(hex)} onChange={onColorChange}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'border-input text-foreground-100 bg-background flex w-full min-w-0 flex-row items-center gap-0 overflow-hidden rounded-xl border outline-none',
              open && 'border-ring ring-ring/50 ring-[3px]',
            )}
            onClick={() => setOpen(true)}
          >
            <ColorSwatch className='aspect-square h-full border-r hover:cursor-pointer' />
            <ColorField className='flex w-full flex-col gap-2' aria-label='hex color'>
              <ColorInput
                className='focus-visible:ring-none placeholder:text-border py-2 pr-3.5 pl-3 focus-visible:border-none focus-visible:outline-none'
                placeholder='#ffd60a'
                onClick={(e) => {
                  /* prevent double-firing with row onClick */
                  e.stopPropagation()
                  setOpen(true)
                }}
              />
            </ColorField>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align='center'
          className='max-w-[265px] p-8'
          onOpenAutoFocus={(e) => {
            /* prevent popover stealing focus from input */
            e.preventDefault()
          }}
          onInteractOutside={(e) => {
            /* Don't close if clicking the trigger row (it manages itself) */
            setOpen(false)
          }}
        >
          <div className='flex w-full flex-col gap-2 outline-none'>
            <div>
              <ColorArea
                colorSpace='hsb'
                xChannel='saturation'
                yChannel='brightness'
                className='aspect-square w-full rounded-b-none border-b-0'
              >
                <ColorThumb className='z-50' />
              </ColorArea>
              <ColorSlider colorSpace='hsb' channel='hue'>
                <SliderTrack className='w-full rounded-t-none border-t-0'>
                  <ColorThumb className='top-1/2' />
                </SliderTrack>
              </ColorSlider>
            </div>
            <ColorSwatchPicker className='w-full justify-center'>
              <ColorSwatchPickerItem color='#d00000'>
                <ColorSwatch />
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color='#fb8500'>
                <ColorSwatch />
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color='#70e000'>
                <ColorSwatch />
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color='#219ebc'>
                <ColorSwatch />
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color='#fe689b'>
                <ColorSwatch />
              </ColorSwatchPickerItem>
            </ColorSwatchPicker>
          </div>
        </PopoverContent>
      </Popover>
    </Picker>
  )
}
