
export default function rgbToHex(colorArray: Uint8ClampedArray | undefined): string {
    if (!colorArray) return "#4d4d4d"
    return `#${colorArray[0].toString(16).padStart(2, '0')}${colorArray[1].toString(16).padStart(2, '0')}${colorArray[2].toString(16).padStart(2, '0')}`;
}
  