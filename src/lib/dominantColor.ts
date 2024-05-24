import { createCanvas, loadImage } from 'canvas';
import path from 'path';

type DominantColorResult = Uint8ClampedArray;

type ColorPaletteResult = Uint8ClampedArray[]

type AllColorResult = {
  dominantColor: Uint8ClampedArray;
  colorPalette: Uint8ClampedArray[];
};

//all color
const getAllColor = async (src: string): Promise<AllColorResult> => {
  
  if (typeof window !== 'undefined') {
    // Client-side code
    return new Promise((resolve, reject) => {
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        reject('Failed to get 2D context');
        return;
      }
      context.imageSmoothingEnabled = true;

      let img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";

      img.onload = () => {
        // Compute 1x1 pixel color
        canvas.width = 1;
        canvas.height = 1;
        context!.drawImage(img, 0, 0, 1, 1);
        const dominantColor = context!.getImageData(0, 0, 1, 1).data.slice(0, 3) as Uint8ClampedArray;

        // Compute 2x2 pixel colors
        canvas.width = 2;
        canvas.height = 2;
        context!.drawImage(img, 0, 0, 2, 2);
        const imageData = context!.getImageData(0, 0, 2, 2).data;
        const colorPalette = [
          imageData.slice(0, 3),    // First pixel (0, 0)
          imageData.slice(4, 7),    // Second pixel (1, 0)
          imageData.slice(8, 11),   // Third pixel (0, 1)
          imageData.slice(12, 15)   // Fourth pixel (1, 1)
        ].map(arr => new Uint8ClampedArray(arr));

        resolve({ dominantColor, colorPalette });
      };

      img.onerror = (err) => {
        reject(err);
      };
    });
  } else {
    // Server-side code
    const canvas = createCanvas(1, 1);
    const context = canvas.getContext('2d');
    
    const img = await loadImage(path.join(process.cwd(), 'public', src));

    // Compute 1x1 pixel color
    context.drawImage(img, 0, 0, 1, 1);
    const dominantColor = context.getImageData(0, 0, 1, 1).data.slice(0, 3) as Uint8ClampedArray;

    // Compute 2x2 pixel colors
    canvas.width = 2;
    canvas.height = 2;
    context.drawImage(img, 0, 0, 2, 2);
    const imageData = context.getImageData(0, 0, 2, 2).data;
    const colorPalette = [
      imageData.slice(0, 3),    // First pixel (0, 0)
      imageData.slice(4, 7),    // Second pixel (1, 0)
      imageData.slice(8, 11),   // Third pixel (0, 1)
      imageData.slice(12, 15)   // Fourth pixel (1, 1)
    ].map(arr => new Uint8ClampedArray(arr));

    return { dominantColor, colorPalette };
  }
};

//dominant color
const getDominantColor = async (src: string): Promise<DominantColorResult> => {
  const canvas = createCanvas(1, 1);
  const context = canvas.getContext('2d');
  const img = await loadImage(path.join(process.cwd(), 'public', src));

  
  // Compute 1x1 pixel color
  context.drawImage(img, 0, 0, 1, 1);
  const dominantColor = context.getImageData(0, 0, 1, 1).data.slice(0, 3) as Uint8ClampedArray;

  return dominantColor;
};

//color palette
const getColorPalette = async (src: string): Promise<ColorPaletteResult> => {
  const canvas = createCanvas(3, 3);
  const context = canvas.getContext('2d');
  const img = await loadImage(path.join(process.cwd(), 'public', src));

  
  // Compute 2x2 pixel colors
  context.drawImage(img, 0, 0, 3, 3);
  const imageData = context.getImageData(0, 0, 2, 2).data;
  const colorPalette = [
    imageData.slice(0, 3),
    imageData.slice(4, 7),
    imageData.slice(8, 11),
    imageData.slice(12, 15),
    imageData.slice(16, 18),
    imageData.slice(19, 21),
    imageData.slice(22, 24),
    imageData.slice(25, 27),
    imageData.slice(28, 30),
  ].map(arr => new Uint8ClampedArray(arr));

  return colorPalette;
};

const fetchAllColor = async (src: string): Promise<AllColorResult | null> => {
    try {
      const result = await getAllColor(src);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
};

const fetchDominantColor = async (src: string): Promise<DominantColorResult | null> => {
  try {
    const result = await getDominantColor(src);
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const fetchColorPalette = async (src: string): Promise<ColorPaletteResult | null> => {
  try {
    const result = await getColorPalette(src);
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const dominantColor = {
  getAll: fetchAllColor,
  getDominant: fetchDominantColor,
  getPalette: fetchColorPalette,
};

export default dominantColor;
