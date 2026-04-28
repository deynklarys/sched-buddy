import { Canvas, FabricImage, Group, Point, Rect } from 'fabric'

export class ImagePreviewCanvasEngine {
  private CANVAS: Canvas

  constructor(
    canvas: HTMLCanvasElement,
    scheduleContext: {
      width: number
      height: number
      timetableGroup: Group
    },
  ) {
    this.CANVAS = new Canvas(canvas, {
      width: 500,
      height: 500,
      backgroundColor: '#ffffff',
    })
    const CANVAS_WIDTH = this.CANVAS.getWidth()
    const CANVAS_HEIGHT = this.CANVAS.getHeight()

    /* See-through Overlay */
    const overlay = new Rect({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      left: 0,
      top: 0,
      originX: 'left',
      originY: 'top',
      selectable: false,
      evented: false,
      // opacity: 0.5,
      fill: '#E7F3FF',
    })

    const cutoutScale = 0.8
    let cutoutWidth = 200
    let cutoutHeight = 200

    /* Determine the dimensions of the cutout based on the current schedule's dimensions */
    const isHeightGreater = scheduleContext.height > scheduleContext.width
    if (isHeightGreater) {
      cutoutHeight = CANVAS_HEIGHT * cutoutScale
      cutoutWidth =
        cutoutHeight * (scheduleContext.width / scheduleContext.height)
    } else {
      cutoutWidth = CANVAS_WIDTH * cutoutScale
      cutoutHeight =
        cutoutWidth * (scheduleContext.height / scheduleContext.width)
    }

    /* Shape to subtract */
    const cutout = new Rect({
      width: cutoutWidth,
      height: cutoutHeight,
      left: overlay.getScaledWidth() / 2,
      top: overlay.getScaledHeight() / 2,
      originX: 'center',
      originY: 'center',
      inverted: true,
      absolutePositioned: true,
    })
    overlay.clipPath = cutout

    const srcCanvasLogicalWidth = scheduleContext.width
    const srcCanvasLogicalHeight = scheduleContext.height
    const originalTimetableGroupLeft = scheduleContext.timetableGroup.left
    const originalTimetableGroupTop = scheduleContext.timetableGroup.top

    /* Mimic the canvas */

    /* Rect to span the group to the canvas dimension */
    const srcCanvasPlaceholder = new Rect({
      width: srcCanvasLogicalWidth,
      height: srcCanvasLogicalHeight,
      /* Group object has its own internal coordinate system where (0,0) is at the center.
         So offset the background such that its at the top left of the group */
      left: -srcCanvasLogicalWidth / 2,
      top: -srcCanvasLogicalHeight / 2,
      originX: 'left',
      originY: 'top',
      fill: '#ff0000',
      absolutePositioned: false,
    })

    /* Insert the cloned timetableGroup */
    scheduleContext.timetableGroup.set({
      /* - originalTimetableGroupLeft & originalTimetableGroupLeft 
         originates from the canvas's top left
         - group's origin (0,0) is at the center */
      left: originalTimetableGroupLeft - srcCanvasLogicalWidth / 2,
      top: originalTimetableGroupTop - srcCanvasLogicalHeight / 2,
    })

    const scheduleGroup = new Group(
      [srcCanvasPlaceholder, scheduleContext.timetableGroup],
      {
        clipPath: srcCanvasPlaceholder,
        // selectable: false,
        // evented: false,
      },
    )
    // scheduleGroup.set({
    //   width: scheduleContext.width,
    //   height: scheduleContext.height,
    //   left: 0,
    //   top: 0,
    // })
    scheduleGroup.setCoords()

    console.log(
      srcCanvasPlaceholder.getScaledWidth() / scheduleGroup.getScaledWidth(),
    )

    scheduleGroup.scaleToWidth(cutoutWidth)
    // scheduleGroup.scaleToWidth(
    //   cutoutWidth +
    //     (scheduleGroup.getScaledWidth() -
    //       srcCanvasPlaceholder.getScaledWidth()),
    // )

    const center = new Point(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
    overlay.setXY(center, 'center', 'center')
    scheduleGroup.setXY(center, 'center', 'center')

    this.CANVAS.add(overlay)
    this.CANVAS.add(scheduleGroup)

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
