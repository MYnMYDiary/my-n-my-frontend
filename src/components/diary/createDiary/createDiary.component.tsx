'use client';

import { useState } from 'react'
import style from '@/styles/css/diary/createDiary.module.css'
import Cropper from 'react-easy-crop';
import { useImageCrop } from '@/hooks/image/useImageCrop';
import DiaryImage from '@/components/diary/createDiary/DiaryImage';
import { useRouter } from 'next/navigation';
import { createFormData } from '@/utils/createFormData';
import { v4 as uuid} from 'uuid'
import { useUploadDiaryImage } from '@/api/queries/diary/createDiary.query';

// API로 가져오기(추후 수정)
const category = [
  {id: '001', name: 'Monthly'},
  {id: '002', name: 'Weekly'},
  {id: '003', name: 'Daily'},
  {id: '004', name: 'Copy Notes'},
]

export default function CreateDiary() {

    const [selectedCategory, setSelectedCategory] = useState<string>('001');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 이미지 자르기
    const crop = useImageCrop();

    //이미지 업로드
    const {image, uploadImage} = useUploadDiaryImage();
  
  
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
  
    /**
     * 이미지를 선택해서 크롭한 뒤 선택하는 버튼을 클릭하면 발생하는 이벤트
     */
    const handleSeletImage = async () => {
      crop.handleCropConfirm(crop.imageUrl);

      const formData = await createFormData({
        blobUrl: crop.croppedImage,
        fileName:`${uuid()}.jpg`,
        fieldName: 'image'
      });
      
      if(formData){
        uploadImage(formData)
      }
    }

    const checkDiary = (title: string, content: string, image: string) => {

      if(!title){
        alert('제목을 입력해주세요');
        return;
      }

      if(!image){
        alert('다이어리 이미지를 선택해주세요.');
        return;
      }

      return {
        categoryId: selectedCategory,
        title,
        content,
        image
      }
    }
  
    /**
     * 다이어리를 작성한 뒤 저장버튼을 클릭했을 때 실행되는 함수
     */
    const handleUploadDiary = async () => {
      const diary = checkDiary(title, content, image);
      console.log(diary);
  };

  return (
    <div className={style.frame}>

        <div className={style.left}>
              <DiaryImage
                selectedCategory={selectedCategory}
                croppedImage={crop.croppedImage}
                fileInputRef={crop.fileInputRef}
                handlers={{
                  selectFile: crop.selectFile,
                  setIsCropping: crop.setIsCropping,
                  selectedImage: crop.selectedImage
              }}/>
        </div>

        {/* 크롭 UI */}
        {
          crop.isCropping && (
            <div className={style.cropContainer}>
            <Cropper
              image={crop.imageUrl}
              crop={crop.crop}
              zoom={crop.zoom}
              aspect={imageAspect()} // 비율
              onCropChange={crop.setCrop}
              onZoomChange={crop.setZoom}
              onCropComplete={crop.onCropComplete}
            />
            <button className={style.cropSaveBtn} onClick={handleSeletImage}>확인</button>
          </div>
          )
        }

        <div className={style.right}>

          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            { category.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
  
          <input type='text' placeholder='제목' onChange={(e) => setTitle(e.target.value)}/>

          <textarea placeholder='설명'onChange={(e) => setContent(e.target.value)}/>

          <button type='button' className={style.saveBtn} onClick={handleUploadDiary}>저장</button>

        </div>
    </div>
  )
}
