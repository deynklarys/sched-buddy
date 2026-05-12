import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TabletSmartphone } from 'lucide-react'
import { TextHeadingSM, TextBody } from '@/components/text'
import { cn } from '@/lib/utils'
import { ComponentClassNameProp } from '@/types'
import { useState } from 'react'

function Card({
  heading,
  description,
  className,
}: { heading: string; description: string } & ComponentClassNameProp) {
  return (
    <div
      className={cn(
        'bg-muted flex aspect-square w-[350px] flex-col rounded-lg border *:px-8 *:py-6',
        'hover:ring-ring hover:cursor-pointer hover:ring-[4px] hover:ring-offset-4',
        className,
      )}
    >
      <div className='grow'></div>
      <div className='border-t'>
        <TextHeadingSM>{heading}</TextHeadingSM>
        <TextBody className='text-muted-foreground'>{description}</TextBody>
      </div>
    </div>
  )
}

function ChangeImage() {
  return <div className='h-[200px] w-[1000px]'></div>
}

function ChangeFill() {
  return <div className='h-[200px] w-[1000px]'></div>
}

export default function ChangeBackground() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<'image' | 'fill' | null>(null)

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          setTimeout(() => setSelected(null), 100)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant='outline'>
          <TabletSmartphone />
          Change Background
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-fit'>
        <DialogHeader>
          <DialogTitle>Change Background</DialogTitle>
        </DialogHeader>

        {selected === null && (
          <div className='grid grid-cols-[auto_auto] gap-8 p-8 *:grow'>
            <div
              onClick={() => {
                setSelected('image')
              }}
            >
              <Card heading='Image' description='Add an image to the schedule' />
            </div>
            <div
              onClick={() => {
                setSelected('fill')
              }}
            >
              <Card heading='Fill' description='Use a solid color as the background' />
            </div>
          </div>
        )}
        {selected === 'image' && <ChangeImage />}
        {selected === 'fill' && <ChangeFill />}
      </DialogContent>
    </Dialog>
  )
}
