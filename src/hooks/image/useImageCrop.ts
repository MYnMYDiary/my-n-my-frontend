'use client';

import { getCroppedImg } from "@/utils/cropUtils";
import heic2any from "heic2any";
import { useState, useCallback, useRef } from "react";

import { Area } from "react-easy-crop"; // ✅ Area 타입 임포트


/**
 * 이미지 크롭하는 커스텀 훅
 * @property 
 */
export const useImageCrop = () => {

  // 이미지 입력받기
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 필드 참조
  const [imageUrl, setImageUrl] = useState<string>('')
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 현재 이미지 크롭 상태 (x, y 좌표)
  const [zoom, setZoom] = useState(1); // 줌 상태 (1은 기본 크기)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null); // 픽셀 단위의 크롭 영역 정보를 저장하는 상태 (초기값 null)
  //const [croppedImage, setCroppedImage] = useState<string>(''); // 크롭된 이미지의 Base64 또는 Blob URL을 저장하는 상태
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
  const selectedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        let processedFile = file;
        
        // HEIC 파일인 경우 JPG로 변환
        if (file.type === 'image/heic' || file.type === 'image/heif') {
          processedFile = await convertHeicToJpg(file);
        }
        
        // 허용된 이미지 형식 검사
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(processedFile.type)) {
          alert('JPG 또는 PNG 형식의 이미지만 업로드 가능합니다.');
          e.target.value = '';
          return;
        }

        const imageUrl = URL.createObjectURL(processedFile);
        setImageUrl(imageUrl);
        setIsCropping(true);
        
      } catch (error) {
        console.error('이미지 처리 중 오류 발생:', error);
        alert('이미지 처리 중 오류가 발생했습니다.');
        e.target.value = '';
      }
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


    /**
   * HEIC 파일을 JPG로 변환하는 함수
   * @param file - 변환할 HEIC 파일
   * @returns 변환된 JPG 파일
   */
    const convertHeicToJpg = async (file: File): Promise<File> => {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8
        });
  
        return new File(
          [convertedBlob as Blob],
          file.name.replace(/\.(heic|HEIC)$/, '.jpg'),
          { type: 'image/jpeg' }
        );
      } catch (error) {
        console.error('HEIC 변환 중 오류:', error);
        throw new Error('HEIC 이미지 변환에 실패했습니다.');
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
