'use client';

import { getCroppedImg } from "@/utils/cropUtils";
import { useState, useCallback, useRef } from "react";

import { Area } from "react-easy-crop"; // ✅ Area 타입 임포트


/**
 * 이미지 크롭하는 커스텀 훅
 */
export const useImageCrop = () => {

  // 이미지 입력받기
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 필드 참조
  const [imageUrl, setImageUrl] = useState<string>('')

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 현재 이미지 크롭 상태 (x, y 좌표)
  const [zoom, setZoom] = useState(1); // 줌 상태 (1은 기본 크기)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null); // 픽셀 단위의 크롭 영역 정보를 저장하는 상태 (초기값 null)
  const [croppedImage, setCroppedImage] = useState<string>(''); // 크롭된 이미지의 Base64 또는 Blob URL을 저장하는 상태
  const [isCropping, setIsCropping] = useState(false); // 크롭 작업이 진행 중인지 여부를 나타내는 상태

  /**
   * 1. 파일 선택
   * - <input> 태그가 아닌 img 또는 div를 클릭했을 때 파일 선택창이 뜬다
   */
  const selectFile = () => {
    fileInputRef.current?.click(); // input 필드 트리거
  };

  /**
   * 2. 파일 선택에서 이미지를 선택했을 때 일어나는 함수
   */
  const selectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
        const imageUrl = URL.createObjectURL(file);
        console.log("Blob URL:", imageUrl);
        setImageUrl(imageUrl); //선택한 이미지 저장
        setIsCropping(true); //이미지가 선택되면 크롭작업 진행하기
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
    if (!croppedAreaPixels) return;

    // 크롭된 이미지 확정
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImg);
      setIsCropping(false);
    } catch (error) {
      console.error("Cropping failed:", error);
    }
  };

  return {
    data: {
      imageUrl,
      fileInputRef,
      crop,
      zoom,
      isCropping,
      croppedImage,
      selectFile,
      selectedImage,
      setCrop,
      setZoom,
      setIsCropping,
      onCropComplete,
      handleCropConfirm,
      setImageUrl
    }
  };
};
