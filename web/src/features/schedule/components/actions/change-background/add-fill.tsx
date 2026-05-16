import { TimetableSnapshot } from '@/features/canvas-engine/canvas-engine'
import { useCanvasEngine } from '@/features/canvas-engine/use-canvas-engine-store'
import { cn } from '@/lib/utils'
import { ComponentClassNameProp } from '@/types'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

interface MimicCanvasProps {
  snapshot: TimetableSnapshot
  backgroundColor: string
}

export function MimicCanvas({
  snapshot,
  backgroundColor,
  className,
}: MimicCanvasProps & ComponentClassNameProp) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(null)

  const {
    imageSrc,
    left,
    top,
    scaleX,
    scaleY,
    angle,
    width: groupW,
    height: groupH,
    canvasWidth,
    canvasHeight,
  } = snapshot

  /* Compute wrappe -> logical scale from the container's rendered width.
  ResizeObserver keeps it correct if the dialog/container resizes. */
  useEffect(() => {
    if (!wrapperRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / canvasWidth)
    })
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [canvasWidth])

  return (
    <div
      ref={wrapperRef}
      className={cn('border-2', className)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: `${canvasWidth} / ${canvasHeight}`,
        overflow: 'hidden',
        backgroundColor,
      }}
    >
      {scale !== null && (
        <Image
          src={imageSrc}
          alt='timetable'
          draggable={false}
          /* a data-URL is passed, no Next.js optimization needed */
          unoptimized
          width={groupW * scaleX * scale}
          height={groupH * scaleY * scale}
          style={{
            position: 'absolute',
            left: left * scale,
            top: top * scale,
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'top left',
            display: 'block',
          }}
        />
      )}
    </div>
  )
}

export default function AddFill({ setDialogOpen }: { setDialogOpen: (open: boolean) => void }) {
  const canvasEngine = useCanvasEngine()
  const [backgroundColor, setBackgroundColor] = useState('#fff')

  const snapshot = useMemo(() => {
    if (!canvasEngine) return null
    const snap = canvasEngine.getTimetableSnapshot()
    if (!snap) return null
    const { width: canvasWidth, height: canvasHeight } = canvasEngine.getCanvasDimenstions()
    return { ...snap, canvasWidth, canvasHeight }
  }, [canvasEngine])

  return (
    <div className='flex h-[500px] w-[750px] flex-col gap-8 p-8'>
      <div className=''>
        {snapshot && (
          <MimicCanvas
            className='rounded-lg'
            snapshot={snapshot}
            backgroundColor={backgroundColor}
          />
        )}
      </div>
    </div>
  )
}
