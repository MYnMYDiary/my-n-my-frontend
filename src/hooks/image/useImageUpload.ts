'use client';

import { useRef, useState } from 'react'

/**
 * 이미지 업로드 커스텀 Hook
 * @returns preview, imgFile, fileInputRef, handleIconClick, handleImageChange
 */
export const useImageUpload = () => {

    // State
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(''); // 이미지 미리보기
    const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 필드 참조
  
  
    // 아이콘 클릭 시 파일 업로드 트리거
    const handleIconClick = () => {
      fileInputRef.current?.click(); // input 필드 트리거
    };
  
    //이미지 업로드
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
  
      if (file) {
          const imageUrl = URL.createObjectURL(file);
          console.log("Blob URL:", imageUrl);
          setPreview(imageUrl); // 미리보기 저장
      }
  };

  return {
    preview,
    imgFile,
    fileInputRef,
    handleIconClick, handleImageChange
  }
}