import { Canvas, FabricImage, Group, Rect } from 'fabric'

export class ImagePreviewCanvasEngine {
  private CANVAS: Canvas

  constructor(
    canvas: HTMLCanvasElement,
    schedule: {
      width: number
      height: number
      timetableGroup: Group
    },
  ) {
    console.log('Cloned timetable: ', schedule.timetableGroup)

    this.CANVAS = new Canvas(canvas, {
      width: 500,
      height: 500,
      backgroundColor: '#ffffff',
    })
    const CANVAS_WIDTH = this.CANVAS.getWidth()
    const CANVAS_HEIGHT = this.CANVAS.getHeight()

    /* Overlay */
    const bg = new Rect({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      left: 0,
      top: 0,
      originX: 'left',
      originY: 'top',
      selectable: false,
      evented: false,
      opacity: 0.5,
      fill: '#E7F3FF',
    })

    const scale = 0.8
    let cutoutWidth = 200
    let cutoutHeight = 200

    /* Determine the dimensions of the cutout based on the current schedule's dimensions */
    const isHeightGreater = schedule.height > schedule.width
    if (isHeightGreater) {
      cutoutHeight = CANVAS_HEIGHT * scale
      cutoutWidth = cutoutHeight * (schedule.width / schedule.height)
    } else {
      cutoutWidth = CANVAS_WIDTH * scale
      cutoutHeight = cutoutWidth * (schedule.height / schedule.width)
    }

    /* Shape to subtract */
    const cutout = new Rect({
      width: cutoutWidth,
      height: cutoutHeight,
      left: bg.getScaledWidth() / 2,
      top: bg.getScaledHeight() / 2,
      originX: 'center',
      originY: 'center',
      inverted: true,
      absolutePositioned: true,
    })
    bg.clipPath = cutout
    this.CANVAS.add(bg)

    this.CANVAS.renderAll()
  }

  async addImage(url: string) {
    try {
      const img = await FabricImage.fromURL(url, {
        crossOrigin: 'anonymous',
      })

      img.set({
        left: this.CANVAS.getWidth() / 2,
        top: this.CANVAS.getHeight() / 2,
        originX: 'center',
        originY: 'center',
      })
      img.scaleToWidth(this.CANVAS.width / 1.5)

      this.CANVAS.add(img)
      this.CANVAS.sendObjectToBack(img)
      this.CANVAS.renderAll()

      return img
    } catch (error) {
      console.error('Failed to load image:', error)
      throw error
    }
  }

  dispose() {
    this.CANVAS.dispose()
  }
}
