'use client'

import { useRef, useState } from "react";
import { useObjectUrl } from "./useObjectUrl";
import heic2any from "heic2any";
import imageCompression from "browser-image-compression";
import { convertHeicToJpg } from "@/utils/heic-to-jpg";

/**
 * 이미지 선택후 검증하는 커스텀훅
 * @param multiple 여러 이미지 선택 여부 (false: 단일 이미지, true: 여러 이미지)
 * @returns 
 */
export const useImageSelector = (multiple:boolean) => {

    const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 필드 참조
    const [isProcessing, setIsProcessing] = useState(false); // 이미지 처리 상태
    const {createUrl, createUrls, revokeAll} = useObjectUrl(); // 이미지 URL 관리

    // 파일 입력 필드 트리거
    const selectFile = () => {
        fileInputRef.current?.click();
    }

    /**
     * 이미지 선택 및 처리
     * @param e 
     * @returns imageUrls: 이미지 URL 배열, files: 선택된 파일 배열
     * @returns imageUrl: 이미지 URL, file: 선택된 파일
     */
    const handleImageSelect = async (imageFiles: File[]) => {
     
        // 다중선택 검증과 최대 이미지 개수 검증
        if(multiple && imageFiles.length > 10) {
            throw new Error('최대 10개의 이미지만 선택할 수 있습니다.');
        }

        setIsProcessing(true); // 이미지 처리 시작
        try {

            if(multiple) { // 다중 이미지 선택

                const files = imageFiles; // 선택된 파일 배열

                const processedFiles = await Promise.all(
                    files.map(async (file) => {

                        let processedFile = file;

                        // HEIC 파일 변환
                        if (processedFile.type === 'image/heic' || processedFile.type === 'image/heif') {
                            processedFile = await convertHeicToJpg(processedFile);
                        }

                        // 허용된 이미지 형식 검사
                        const validImageTypes = ['image/jpeg', 'image/png'];
                        if (!validImageTypes.includes(processedFile.type)) {
                            alert('JPG 또는 PNG 형식의 이미지만 업로드 가능합니다.');
                            return;
                        }

                        // 파일 크기 체크 (2.3MB = 2.3 * 1024 * 1024 bytes)
                        const maxSize = 2300000;
                        if (processedFile.size > maxSize) {
                            processedFile = await compressImage(processedFile);
                            
                            if (processedFile.size > maxSize) {
                                alert('파일 크기가 2.3MB를 초과합니다. 더 작은 이미지를 선택해주세요.');
                                return;
                            }
                        }

                        return processedFile;
                        
                    })
                );
                // 이전 URL 정리 후 새로운 URL 생성
                const validFiles = processedFiles.filter((file): file is File => file !== undefined);
                const imageUrls = createUrls(validFiles);
    
                return {
                    imageUrls,
                    files: validFiles
                };
            }
            else{ // 단일 이미지 선택

                let processedFile = imageFiles[0]; //선택된 파일

                // HEIC 파일 변환 - 유틸리티 함수 사용
                if (processedFile.type === 'image/heic' || processedFile.type === 'image/heif') {
                    processedFile = await convertHeicToJpg(processedFile);
                }

                // 허용된 이미지 형식 검사
                const validImageTypes = ['image/jpeg', 'image/png'];
                if (!validImageTypes.includes(processedFile.type)) {
                    alert('JPG 또는 PNG 형식의 이미지만 업로드 가능합니다.');
                    return;
                }

                // 파일 크기 체크 (2.3MB = 2.3 * 1024 * 1024 bytes)
                const maxSize = 2.3 * 1024 * 1024;
                if (processedFile.size > maxSize) {
                    processedFile = await compressImage(processedFile);
                    
                    if (processedFile.size > maxSize) {
                        alert('파일 크기가 2.3MB를 초과합니다. 더 작은 이미지를 선택해주세요.');
                        return;
                    }
                }
                const imageUrl = createUrl(processedFile);
    
                return {
                    url: imageUrl,
                    file: processedFile
                };
    
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('이미지 처리 중 오류가 발생했습니다.');
        } finally {
            setIsProcessing(false);
        }    
    };


        /**
     * 이미지 압축
     */
        const compressImage = async (file: File): Promise<File> => {

            const options = {
                maxSizeMB: 2.3,         // 2.3MB 제한
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: 0.7,
            };
    
            try {
                return await imageCompression(file, options);
            } catch (error) {
                throw new Error('이미지 압축에 실패했습니다.');
            }
        };

    return {
        isProcessing,
        fileInputRef,
        selectFile,
        handleImageSelect,
    }


}