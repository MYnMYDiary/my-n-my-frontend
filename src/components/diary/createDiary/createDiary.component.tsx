'use client';

import { useEffect, useState } from 'react'
import style from '@/styles/css/diary/createDiary.module.css'
import Cropper from 'react-easy-crop';
import { useImageCrop } from '@/hooks/image/useImageCrop';
import DiaryImage from '@/components/diary/createDiary/DiaryImage';
import { useRouter } from 'next/navigation';
import { createFormData } from '@/utils/createFormData';
import { v4 as uuid} from 'uuid'
import { useUploadDiary, useUploadDiaryImage } from '@/api/queries/diary/createDiary.query';

// API로 가져오기(추후 수정)
const category = [
  {id: '001', name: 'Monthly'},
  {id: '002', name: 'Weekly'},
  {id: '003', name: 'Daily'},
  {id: '004', name: 'Copy Notes'},
]

export default function CreateDiary() {

    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<string>('001');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [croppedImg, setCroppedImg] = useState<string>('');

    // 이미지 자르기
    const crop = useImageCrop();

    //이미지 업로드
    const {image, uploadImage} = useUploadDiaryImage();

    //다이어리 업로드
    const {isSuccess, uploadDiary} = useUploadDiary();
  
  
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
      const cropped = await crop.handleCropConfirm(crop.imageUrl);
      if (!cropped) return;

      setCroppedImg(cropped); // ✅ 상태 업데이트
    };

    /**
    * croppedImg 변경될 때 업로드 실행
    */
    useEffect(() => {
      if (!croppedImg) return;

      (async () => {
        const formData = await createFormData({
          blobUrl: croppedImg,
          fileName: `${uuid()}.jpg`,
          fieldName: 'image'
        });

        if (formData) {
          uploadImage(formData);
        }
      })();
    }, [croppedImg]); // 🔥 croppedImg가 변경될 때 실행

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
      if(diary){
        try {
          uploadDiary({
            categoryId: diary.categoryId,
            title: diary.title,
            content: diary.content,
            image: diary.image
          });
          router.push('/mypage');
        } catch (error) {console.log(error);}
      }
  };

  return (
    <div className={style.frame}>

        <div className={style.left}>
              <DiaryImage
                selectedCategory={selectedCategory}
                croppedImage={croppedImg}
                fileInputRef={crop.fileInputRef}
                handlers={{
                  selectFile: crop.selectFile,
                  setIsCropping: crop.setIsCropping,
                  selectedImage: crop.selectedImage,                 
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
