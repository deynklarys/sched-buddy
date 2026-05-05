'use client'

import ColorPicker from '@/components/color-picker'
import WidthContainer from '@/components/container'
import {
  TextBody,
  TextDisplay,
  TextHeadingLG,
  TextHeadingMD,
  TextHeadingSM,
  TextSub,
} from '@/components/text'
import { TimePicker } from '@/components/time-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AddSubject from '@/features/schedule/components/actions/add-subject'
import { Plus } from 'lucide-react'
import { useState } from 'react'

function Hero() {
  return (
    <div className='grid min-h-[750px] w-full place-items-center border-b pb-16'>
      <div className='flex max-w-[450px] flex-col items-center gap-4 *:text-center'>
        <TextDisplay>Sched Buddy Design System</TextDisplay>
        <TextHeadingSM>
          Upload your COR and get a clean, editable weekly schedule in seconds.
        </TextHeadingSM>
      </div>
    </div>
  )
}

function Typescale() {
  return (
    <div className='w-full rounded border-b py-16'>
      <div className='flex flex-col gap-8 *:text-center'>
        <TextDisplay>Display</TextDisplay>
        <TextHeadingLG>Heading Large</TextHeadingLG>
        <TextHeadingMD>Heading Medium</TextHeadingMD>
        <TextHeadingSM>Heading Small</TextHeadingSM>
        <TextBody>Body</TextBody>
        <TextSub>Sub</TextSub>
      </div>
    </div>
  )
}

function TyposcaleShowcase() {
  return (
    <div className='flex flex-col gap-16 border-b py-16'>
      <div className='flex flex-col items-center gap-8'>
        <div className='rounded-full bg-gray-500 px-[8px] py-[1px]'>
          <TextSub className='text-background'>Typography Usage</TextSub>
        </div>
        <div className='flex flex-col gap-8 *:text-center'>
          <TextDisplay>Building Blocks for the Web</TextDisplay>
          <TextHeadingSM className='max-w-[600px]'>
            Clean, modern building blocks. Copy and paste into your apps. Works with all React
            frameworks. Open Source. Free forever.
          </TextHeadingSM>
        </div>
        <div className='flex gap-4'>
          <Button>Browse Blocks</Button>
          <Button variant='outline'>View Components</Button>
        </div>
      </div>
      <div className='flex flex-col items-center gap-8'>
        <TextHeadingLG className='max-w-[300px] text-center'>
          Send, receive, swap. All in one place.
        </TextHeadingLG>
        <div className='flex w-full flex-row flex-wrap justify-between gap-8'>
          <div className='flex w-[450px] flex-col gap-2'>
            <TextHeadingMD>Send & Receive</TextHeadingMD>
            <TextBody>
              Flawless essentials. Easily send tokens and collectibles with the fewest taps, or
              share your wallet address by simply scanning a personalized QR code to receive new
              assets.
            </TextBody>
          </div>
          <div className='flex w-[450px] flex-col gap-2'>
            <TextHeadingMD>Decentralized Swaps</TextHeadingMD>
            <TextBody>
              Trade thousands of tokens with minimal fees, 24/7. Family ensures optimal prices from
              various exchanges so you can acquire the tokens you want, whenever you want them.
            </TextBody>
          </div>
          <div className='flex w-[450px] flex-col gap-2'>
            <TextHeadingMD>Send & Receive</TextHeadingMD>
            <TextBody>
              Flawless essentials. Easily send tokens and collectibles with the fewest taps, or
              share your wallet address by simply scanning a personalized QR code to receive new
              assets.
            </TextBody>
          </div>
          <div className='flex w-[450px] flex-col gap-2'>
            <TextHeadingMD>Decentralized Swaps</TextHeadingMD>
            <TextBody>
              Trade thousands of tokens with minimal fees, 24/7. Family ensures optimal prices from
              various exchanges so you can acquire the tokens you want, whenever you want them.
            </TextBody>
          </div>
        </div>
      </div>
    </div>
  )
}

function ButtonShowcase() {
  const variants = ['default', 'outline'] as const

  return (
    <div className='flex w-full flex-col items-center gap-8 rounded border-b py-16'>
      <TextHeadingLG>Button Variants</TextHeadingLG>
      {variants.map((variant, index) => {
        return (
          <div key={index} className='flex flex-row items-center gap-8'>
            <TextHeadingSM>{variant}:</TextHeadingSM>
            <div className='flex flex-row gap-4'>
              <Button variant={variant}>
                <Plus /> Button
              </Button>
              <Button variant={variant}>Button</Button>
              <Button variant={variant} size='icon'>
                <Plus />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function InputShowcase() {
  type Time = {
    hours: number | undefined
    minutes: number | undefined
    meridiem: 'AM' | 'PM'
  }
  const [time, setTime] = useState<Time>({
    hours: undefined,
    minutes: undefined,
    meridiem: 'AM',
  })
  const onTimeChange = (time: Time) => {
    setTime(time)
  }

  const [hex, setHex] = useState('#dd0000')

  return (
    <div className='flex w-full flex-col items-center gap-8 rounded border-b py-16'>
      <TextHeadingLG>Inputs</TextHeadingLG>
      <div className='flex flex-row gap-8'>
        <div className='flex flex-col items-center gap-4'>
          <TextHeadingMD>Input</TextHeadingMD>
          <div className='flex flex-col gap-2'>
            <TextBody>Default</TextBody>
            <Input placeholder='johndoee@gmail.com' />
          </div>
          <div className='flex flex-col gap-2'>
            <TextBody className='text-destructive'>Error</TextBody>
            <Input aria-invalid={true} placeholder='johndoee@gmail.com' />
            <TextSub className='text-destructive'>Error message</TextSub>
          </div>
          <div className='flex flex-col gap-2'>
            <TextBody>Disable</TextBody>
            <Input disabled={true} placeholder='johndoee@gmail.com' />
          </div>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <TextHeadingMD>Time</TextHeadingMD>
          <TimePicker value={time} onChange={onTimeChange} />
          <TimePicker aria-invalid={true} value={time} onChange={onTimeChange} />
        </div>

        <div className='flex flex-col items-center gap-4'>
          <TextHeadingMD>Color</TextHeadingMD>
          <ColorPicker hex={hex} onHexChange={setHex} />
        </div>
      </div>
    </div>
  )
}

function SubjectFormShowcase() {
  return (
    <div className='flex w-full flex-col items-center gap-8 rounded border-b py-16'>
      <TextHeadingLG>Subject Form Dialog</TextHeadingLG>
      <AddSubject />
    </div>
  )
}

export default function DesignPage() {
  return (
    <div className='mb-[200px] flex min-h-screen w-screen flex-col'>
      <Hero />
      <WidthContainer className='flex flex-col'>
        <Typescale />
        <TyposcaleShowcase />
        <ButtonShowcase />
        <InputShowcase />
        <SubjectFormShowcase />
      </WidthContainer>
    </div>
  )
}
