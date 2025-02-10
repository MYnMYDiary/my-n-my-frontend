'use client';

import React from 'react'
import style from '@/styles/css/diary/createDiary.module.css'
import { IoImagesOutline } from 'react-icons/io5';

interface DiaryImageProps{
    selectedCategory: string,
    croppedImage: string|undefined,
    fileInputRef: React.RefObject<HTMLInputElement | null>,
    handlers: {
        selectFile: () => void,
        setIsCropping: (b:boolean) => void,
        selectedImage: (e: React.ChangeEvent<HTMLInputElement>) => void,
    }
}

export default function DiaryImage({selectedCategory,croppedImage,fileInputRef,handlers} :DiaryImageProps) {

    const getImageBoxClass = () => {
      switch (selectedCategory) {
        case '001':
          return style.imgBox_Monthly;
        case '002':
          return style.imgBox_Weekly;
        case '003':
          return style.imgBox_Daily;
        case '004':
          return style.imgBox_CopyNotes;
        default:
          return;
      }
    };

    const handleChooseImage = () => {
      handlers.setIsCropping(true);
    }
    


    return(
        <div className={getImageBoxClass()} onClick={handlers.selectFile}>
            {croppedImage ? 
                <img src={croppedImage} className={style.previewImg} onClick={handleChooseImage}  /> : 
                <IoImagesOutline color="gray" size={40} />
            }        
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlers.selectedImage} style={{display: 'none'}}/>
        </div>
    )

}
