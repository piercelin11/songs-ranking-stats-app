import { useState, useEffect } from 'react';

export default function useDominantColor(src: string): [Uint8ClampedArray | null, boolean] {
  const [color, setColor] = useState<Uint8ClampedArray | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDominantColor = async (src: string): Promise<Uint8ClampedArray> => {
      return new Promise(resolve => {
        let context = document.createElement('canvas').getContext('2d');
        context!.imageSmoothingEnabled = true;

        let img = new Image();
        img.src = src;
        img.crossOrigin = "";

        img.onload = () => {
          context!.drawImage(img, 0, 0, 1, 1);
          resolve(context!.getImageData(0, 0, 1, 1).data.slice(0, 3) as Uint8ClampedArray);
        };
      });
    };

    setLoading(true);
    getDominantColor(src).then(color => {
      setColor(color);
      setLoading(false);
    });
  }, [src]);

  return [color, loading];
}