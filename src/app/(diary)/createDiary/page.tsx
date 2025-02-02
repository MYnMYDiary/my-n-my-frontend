'use client';

import React, {useState } from 'react'
import layoutstyle from "@styles/css/layout.module.css"
import style from '@/styles/css/diary/createDiary.module.css'
import { IoImagesOutline } from 'react-icons/io5';
import Cropper from 'react-easy-crop';
import { useImageCrop } from '@/hooks/image/useImageCrop';
import DiaryImage from '@/components/diary/DiaryImage';


export default function CreateDiary() {
  
  // API로 가져오기(추후 수정)
  const category = [
    {id: '001', name: 'Monthly'},
    {id: '002', name: 'Weekly'},
    {id: '003', name: 'Daily'},
    {id: '004', name: 'Copy Notes'},
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>('001');
  const {data} = useImageCrop();

  const imageAspect = () => {
    switch (selectedCategory) {
      case '001':
        return 16/9;
      case '002':
        return 4/3;
      case '003':
        return 1;
      case '004':
        return 3/4
      default:
        return;
    }
  };


  return (
    <div className={layoutstyle.diary_frame}>

        <div className={style.frame}>
            <div className={style.left}>
                  <DiaryImage
                    selectedCategory={selectedCategory}
                    croppedImage={data.croppedImage}
                    fileInputRef={data.fileInputRef}
                    handlers={{
                      selectFile: data.selectFile,
                      setIsCropping: data.setIsCropping,
                      selectedImage: data.selectedImage
                  }}/>
            </div>

            {/* 크롭 UI */}
            {
              data.isCropping && (
                <div className={style.cropContainer}>
                <Cropper
                  image={data.imageUrl}
                  crop={data.crop}
                  zoom={data.zoom}
                  aspect={imageAspect()} // 비율
                  onCropChange={data.setCrop}
                  onZoomChange={data.setZoom}
                  onCropComplete={data.onCropComplete}
                />
                <button className={style.cropSaveBtn} onClick={() => data.handleCropConfirm(data.imageUrl)}>확인</button>
              </div>
              )
            }

            <div className={style.right}>

              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                { category.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
      
              <input type='text' placeholder='제목'/>

              <textarea placeholder='설명'/>

              <button type='button' className={style.saveBtn}>저장</button>

            </div>
        </div>
    </div>
  )
}
