export const DEFAULT_MEETING_COLORS = [
  '#A8D8FF',
  '#9CB3DA',
  '#BFD7FF',
  '#AEE6D4',
  '#DCEFE6',
  '#CFE7B2',
  '#E1C3FF',
  '#BBBDFF',
  '#F4B6D7',
  '#F7A3A8',
  '#F6A7C7',
  '#FFD6A0',
  '#FFE4B0',
  '#FFA884',
]

export function createUniqueColorGenerator(colorArray = DEFAULT_MEETING_COLORS) {
  const available = [...colorArray]

  return function getRandomColor() {
    if (available.length === 0) return colorArray[0]

    const index = Math.floor(Math.random() * available.length)
    return available.splice(index, 1)[0]
  }
}
