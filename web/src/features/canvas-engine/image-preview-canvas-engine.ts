import { Canvas, Rect } from 'fabric'

export class ImagePreviewCanvasEngine {
  private CANVAS: Canvas

  constructor(canvas: HTMLCanvasElement) {
    this.CANVAS = new Canvas(canvas, {
      width: 500,
      height: 500,
      backgroundColor: '#ffffff',
    })

    const rect = new Rect({
      width: 100,
      height: 100,
      top: 50,
      left: 50,
      fill: '#ff0000',
    })

    this.CANVAS.add(rect)
    this.CANVAS.renderAll()
  }

  dispose() {
    this.CANVAS.dispose()
  }
}
