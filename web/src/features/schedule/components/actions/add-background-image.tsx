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
import { cn } from '@/lib/utils'
import { ComponentClassNameProp } from '@/types'
import { useEffect, useRef, useState } from 'react'

function ImagePreview() {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null)
  const canvasEngineRef = useRef<ImagePreviewCanvasEngine | null>(null)

  useEffect(() => {
    if (!canvasElementRef.current) return

    const engine = new ImagePreviewCanvasEngine(canvasElementRef.current)
    canvasEngineRef.current = engine

    return () => {
      engine.dispose()
      canvasEngineRef.current = null
    }
  }, [])

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
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files ? e.target.files[0] : null
    if (!file) return

    try {
      // const url = URL.createObjectURL(file)
      // canvasEngine.addImage(url)
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
          <ImagePreview />
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
