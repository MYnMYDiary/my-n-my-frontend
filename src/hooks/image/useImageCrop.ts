'use client';

import { getCroppedImg } from "@/utils/cropUtils";
import { useState, useCallback } from "react";
import { Area } from "react-easy-crop"; // ✅ Area 타입 임포트
import { useImageSelector } from "./useImageSelector";


/**
 * 이미지 크롭하는 커스텀 훅
 * @property 
 */
export const useImageCrop = () => {

  const [imageUrl, setImageUrl] = useState<string>('')
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 현재 이미지 크롭 상태 (x, y 좌표)
  const [zoom, setZoom] = useState(1); // 줌 상태 (1은 기본 크기)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null); // 픽셀 단위의 크롭 영역 정보를 저장하는 상태 (초기값 null)
  const [isCropping, setIsCropping] = useState(false); // 크롭 작업이 진행 중인지 여부를 나타내는 상태


  const {isProcessing,
    fileInputRef, // 파일 입력 필드 참조
    selectFile, // 파일 선택
    handleImageSelect, // 이미지 선택
  } = useImageSelector(false);



  /**
   * 2. 파일 선택에서 이미지를 선택했을 때 일어나는 함수
   */
  const selectedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const result = await handleImageSelect(e);
      if (result?.url) {
          setImageUrl(result.url);
          setIsCropping(true);  // 이 부분만 추가로 필요
      }
    } catch (error) {
        console.error('이미지 선택 중 오류:', error);
    }
  };

  /**
   * - `react-easy-crop`의 `onCropComplete` 이벤트 핸들러
   * - 크롭이 완료되었을 때 `croppedAreaPixels` 상태를 업데이트함
   */
  const onCropComplete = useCallback((_:Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

   /**
   * 크롭을 확정하는 함수
   * - 원본 이미지 URL을 받아서 `getCroppedImg` 유틸을 사용해 크롭된 이미지를 생성
   * - 크롭된 이미지를 상태에 저장하고, 크롭 진행 상태를 false로 변경
   */
  const handleCropConfirm = async (image:string) => {

    // 크롭된 이미지가 없다면
    if (!croppedAreaPixels) return '';

    // 크롭된 이미지 확정
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      //setCroppedImage(croppedImg);
      setIsCropping(false);
      return croppedImg; // 🚀 크롭된 이미지 반환
    } catch (error) {
      console.error("Cropping failed:", error);
      return ''
    }
  };


  return {
      imageUrl,
      fileInputRef,
      crop,
      zoom,
      isCropping,
      selectFile,
      selectedImage,
      setCrop,
      setZoom,
      setIsCropping,
      onCropComplete,
      handleCropConfirm,
      setImageUrl
    };
};
