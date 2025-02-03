'use client';

export const getCroppedImg = (imageSrc: string, croppedAreaPixels: { x: number; y: number; width: number; height: number }): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = "anonymous"; // CORS 문제 해결 (필요 시)
      
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext("2d");
  
        if (!ctx) {
          reject(new Error("Canvas context is null"));
          return;
        }
  
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
  
        canvas.toBlob((blob) => {
          if (blob) {
            const fileUrl = URL.createObjectURL(blob);
            resolve(fileUrl);
          } else {
            reject(new Error("Crop failed"));
          }
        }, "image/jpeg");
      };
  
      image.onerror = (err) => reject(err);
    });
  };
  