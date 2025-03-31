'use client';

import React from 'react'
import style from '@/styles/css/diary/createDiary.module.css'
import { IoImagesOutline } from 'react-icons/io5';

interface DiaryImageProps{
    direction: string,
    croppedImage: string|undefined,
    fileInputRef: React.RefObject<HTMLInputElement | null>,
    handlers: {
        selectFile: () => void,
        setIsCropping: (b:boolean) => void,
        selectedImage: (e: React.ChangeEvent<HTMLInputElement>) => void,
    }
}

export default function CreateDiaryImage({direction,croppedImage,fileInputRef,handlers} :DiaryImageProps) {

    const getImageBoxClass = () => {
      switch (direction) {
        case 'row':
          return style.imgBox_Row;
        case 'col':
          return style.imgBox_Column;
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
