'use client'

import { useImageSelector } from '@/hooks/image/useImageSelector';
import style from '@styles/css/artist/create-market-product.module.css'
import { FaPlus } from "react-icons/fa6";
import { imgCropToSquare } from '@/utils/img-crop-to-square';
import { useMarketProductImage } from '../contexts/market-product-image.context';
import { useUploadImageForTemp } from '@/api/queries/common/create-image-for-temp.query';
import { createFormData } from '@/utils/createFormData';
import { useEffect, useState } from 'react';


export default function CreateMarketProductImage() {

    // 이미지 선택 커스텀훅
    const { fileInputRef, selectFile, handleImageSelect } = useImageSelector(true);

    // 이미지 업로드 컨텍스트
    const { previewImage, setPreviewImage, isProcessing, setIsProcessing } = useMarketProductImage();

    // 이미지 업로드 쿼리
    const { imageList, uploadImage } = useUploadImageForTemp();


    // 이미지 선택 이벤트 핸들러
    const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFiles = e.target.files; // 선택된 이미지 파일 배열
        if(!imageFiles) return;

        setIsProcessing(true); // 이미지 업로드 시작

        // 1. 선택한 이미지들을 정사각형으로 크롭
        const squareImageFiles = await Promise.all(
            Array.from(imageFiles).map(async (imageFile) => {
                return await imgCropToSquare(imageFile);
            })
        );

        // 2. 크롭된 이미지들을 선택 및 검증후 blobUrl로 변환
        const result = await handleImageSelect(squareImageFiles);
        if(result?.imageUrls){
            // 이미지 미리보기 업데이트
            setPreviewImage(prevImages => [...prevImages, ...result.imageUrls]);
        }

        setIsProcessing(false); // 이미지 업로드 종료
    }

    // 이미지가 바뀔 때 마다 백엔드에 업로드
    useEffect(() => {
        if(previewImage.length !== 0){
            handleUploadImage();
        }
    }, [previewImage]);

    // 이미지 업로드 함수(백엔드 - temp에 업로드)
    const handleUploadImage = async () => {

        // 이미지 파일 이름 생성 - 여기있는 파일은 previewImage에 있는 파일들이야
        const fileNameList = previewImage.map((image) => {
            return `market-product-${image.split('/').pop() || ''}.jpg`;
        });

        const formData = await createFormData({
            blobUrl: previewImage,
            fileName: fileNameList,
            fieldName: 'image'
        });

        if(formData) {
            console.log('Uploading new images:', formData.getAll('image'));
            uploadImage(formData);
        }
        
    }

    // 이미지 삭제 함수
    const handleImageDelete = (index: number) => {
        setPreviewImage(prevImages => 
            prevImages.filter((_, i) => i !== index)
        );
    }

    return (
        <div className={style.imageFrame}>
            <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={onChangeImage} 
                multiple 
                style={{display: 'none'}}
            />
            
            {/* 이미지 미리보기 */} 
            {previewImage.map((image, index) => (
                <div className={style.previewImgBox} key={index} onClick={() => handleImageDelete(index)}>
                    <img src={image} className={style.previewImg} />
                </div>
            ))}

            {isProcessing && (
                <div className={style.processingMessage}>
                    <p>{`이미지 업로드 중이에요 잠시만 기다려주세요 >.<`}</p>
                </div>
            )}

            {/* 이미지 추가 버튼 (10개 미만일 때만 표시) */}
            {previewImage.length < 10 && (
                <div className={style.previewImgBox} onClick={selectFile}>
                    <FaPlus color="gray" size={50} />
                </div>
            )}


        </div>
    )
}