import { useState, useEffect } from 'react';

type DominantColorResult = {
  dominantColor: Uint8ClampedArray;
  colorPalette: Uint8ClampedArray[];
};

export default function useDominantColor(src: string): [DominantColorResult | null, boolean] {
  const [color, setColor] = useState<DominantColorResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDominantColor = (src: string): Promise<DominantColorResult> => {
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
          // 計算 1x1 像素的顏色
          canvas.width = 1;
          canvas.height = 1;
          context!.drawImage(img, 0, 0, 1, 1);
          const dominantColor = context!.getImageData(0, 0, 1, 1).data.slice(0, 3) as Uint8ClampedArray;

          // 計算 3x3 像素的顏色
          canvas.width = 3;
          canvas.height = 3;
          context!.drawImage(img, 0, 0, 3, 3);
          const imageData = context!.getImageData(0, 0, 3, 3).data;
          const colorPalette = [
            imageData.slice(0, 3),    // 第一個像素 (0, 0)
            imageData.slice(4, 7),    // 第二個像素 (1, 0)
            imageData.slice(8, 11),   // 第三個像素 (2, 0)
            imageData.slice(12, 15),  // 第四個像素 (0, 1)
            imageData.slice(16, 19),  // 第五個像素 (1, 1)
            imageData.slice(20, 23),  // 第六個像素 (2, 1)
            imageData.slice(24, 27),  // 第七個像素 (0, 2)
            imageData.slice(28, 31),  // 第八個像素 (1, 2)
            imageData.slice(32, 35)   // 第九個像素 (2, 2)
          ].map(arr => new Uint8ClampedArray(arr));

          resolve({ dominantColor, colorPalette });
        };
 
        img.onerror = (err) => {
          reject(err);
        };
      });
    };

    setLoading(true);
    getDominantColor(src)
      .then(color => {
        setColor(color);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [src]);

  return [color, loading];
}
