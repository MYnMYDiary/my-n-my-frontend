'use client'

import { convertHeicToJpg } from "./heic-to-jpg";


/**
 * 이미지 파일을 정사각형으로 크롭하는 유틸리티 함수
 * @param imageFile - 크롭할 이미지 파일
 * @returns 정사각형으로 크롭된 이미지 파일
 */
export const imgCropToSquare = async (imageFile: File): Promise<File> => {
    let processedFile = imageFile;

    // 1. HEIC 이미지인 경우 JPG로 변환
    if(processedFile.type === 'image/heic' || processedFile.type === 'image/heif'){
        processedFile = await convertHeicToJpg(processedFile);
    }

    // 2. 이미지를 정사각형으로 크롭
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Canvas context 생성 실패'));
            return;
        }

        img.onload = () => {
            try {
                // URL 해제
                URL.revokeObjectURL(objectUrl);

                // 정사각형 크기 계산 (더 작은 변을 기준으로)
                const size = Math.min(img.width, img.height);
                canvas.width = size;
                canvas.height = size;

                // 중앙 기준으로 크롭하기 위한 오프셋 계산
                const offsetX = (img.width - size) / 2;
                const offsetY = (img.height - size) / 2;

                // 이미지를 캔버스에 그리기
                ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

                // 캔버스의 내용을 Blob으로 변환 후 File 객체로 생성
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Blob 생성 실패'));
                        return;
                    }
                    
                    const croppedFile = new File(
                        [blob], 
                        processedFile.name, 
                        { type: 'image/jpeg' }
                    );
                    resolve(croppedFile);
                }, 'image/jpeg', 0.9);

            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => reject(new Error('이미지 로드 실패'));

        // 이미지 로드를 위해 임시 URL 생성
        const objectUrl = URL.createObjectURL(processedFile);
        img.src = objectUrl;
    });
};