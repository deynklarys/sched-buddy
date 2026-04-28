'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ImagePreviewCanvasEngine } from '@/features/canvas-engine/image-preview-canvas-engine'
import { useCanvasEngine } from '@/features/canvas-engine/use-canvas-engine-store'
import { cn } from '@/lib/utils'
import { ComponentClassNameProp } from '@/types'
import { Group } from 'fabric'
import { useEffect, useRef, useState } from 'react'

function ImagePreview({ imageUrl }: { imageUrl: string | null }) {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null)
  const canvasEngineRef = useRef<ImagePreviewCanvasEngine | null>(null)
  const canvasEngine = useCanvasEngine()
  const [scheduleContext, setScheduleContext] = useState<{
    width: number
    height: number
    timetableGroup: Group
  } | null>(null)

  /* Get schedule context */
  useEffect(() => {
    const getTimetableGroup = async () => {
      if (!canvasEngine) return
      const timetableGroup = await canvasEngine.cloneTimetableGroup()
      if (!timetableGroup) return

      const dimensions = canvasEngine.getCanvasDimenstions()
      setScheduleContext({ ...dimensions, timetableGroup })
    }
    getTimetableGroup()
  }, [canvasEngine])

  useEffect(() => {
    /* If canvas element is not ready */
    if (!canvasElementRef.current) return
    /* If no imageUrl available */
    if (!imageUrl) {
      console.log('ImagePreview rendered but no image available!')
      return
    }
    if (!scheduleContext) return

    const engine = new ImagePreviewCanvasEngine(
      canvasElementRef.current,
      scheduleContext,
    )
    // engine.addImage(imageUrl)
    canvasEngineRef.current = engine

    return () => {
      engine.dispose()
      canvasEngineRef.current = null
      setScheduleContext(null)
    }
  }, [imageUrl, scheduleContext])

  return (
    <div className='relative size-[500px]'>
      <div
        ref={canvasContainerRef}
        className='absolute inset-0 grid place-items-center'
      >
        <canvas ref={canvasElementRef} className='rounded-lg border-2' />
      </div>
    </div>
  )
}

function AddBackgroundImage({ className }: ComponentClassNameProp) {
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files ? e.target.files[0] : null
    if (!file) return

    try {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      // canvasEngine.addImage(url)

      /* Open Dialog */
      setIsImagePreviewOpen(true)
    } catch (e) {
      console.log('Error!: ', e)
    }
  }

  return (
    <>
      <Input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleImageFileChange}
        className='hidden'
      />
      <Dialog open={isImagePreviewOpen} onOpenChange={setIsImagePreviewOpen}>
        <Button
          className={cn('', className)}
          variant='outline'
          onClick={() => {
            fileInputRef.current?.click()
          }}
        >
          Image
        </Button>

        <DialogContent className='max-w-min!'>
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <ImagePreview imageUrl={imageUrl} />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddBackgroundImage
