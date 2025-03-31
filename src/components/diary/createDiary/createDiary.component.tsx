'use client';

import { useEffect, useState } from 'react'
import style from '@/styles/css/diary/createDiary.module.css'
import Cropper from 'react-easy-crop';
import { useImageCrop } from '@/hooks/image/useImageCrop';
import { useRouter } from 'next/navigation';
import { createFormData } from '@/utils/createFormData';
import { v4 as uuid} from 'uuid'
import { useUploadDiary, useUploadDiaryImage } from '@/api/queries/diary/createDiary.query';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CreateDiaryImage from '@/components/diary/createDiary/createDiaryImage.component';

// API로 가져오기(추후 수정)
const category = [
  {id: '001', name: 'Monthly'},
  {id: '002', name: 'Weekly'},
  {id: '003', name: 'Daily'},
  {id: '004', name: 'Copy Notes'},
]

export default function CreateDiary() {

    const router = useRouter();

    const [year, setYear] = useState<string>(dayjs().year().toString()); //연도
    const [month, setMonth] = useState<string>((dayjs().month()+1).toString()); //월
    const [selectedCategory, setSelectedCategory] = useState<string>('001'); //카테고리
    const [direction, setDirection] = useState<string>('row'); //이미지 방향
    const [title, setTitle] = useState(''); //제목
    const [content, setContent] = useState(''); //설명
    const [croppedImg, setCroppedImg] = useState<string>(''); //크롭된 이미지

    // 연도 선택
    const handleYearChange = (e: Dayjs | null) => {
      if(e){
        setYear(e.year().toString());
      }
    }

    // 월 선택
    const handleMonthChange = (e: Dayjs | null) => {
      if(e){
        setMonth((e.month()+1).toString());
      }
    }

    // 이미지 자르기
    const crop = useImageCrop();

    //이미지 업로드
    const {image, uploadImage} = useUploadDiaryImage();

    //다이어리 업로드
    const {isSuccess, uploadDiary} = useUploadDiary();
  
  
    // 이미지 비율
    const imageAspect = () => {
      switch (direction) {
        case 'row': // 월간
          return 4/3;
        case 'col': // 주간
          return 3/4;
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

    //croppedImg 변경될 때 업로드 실행
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

    // 다이어리 저장전 검증
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
            year: year,
            month: month,
            title: diary.title,
            content: diary.content,
            image: diary.image
          });
          router.push('/mypage');
        } catch (error) {console.log(error);}
      }
  };

  console.log(direction);
  console.log(imageAspect());

  return (
    <div className={style.frame}>

        <div className={style.left}>
              <CreateDiaryImage
                direction={direction}
                croppedImage={croppedImg}
                fileInputRef={crop.fileInputRef}
                handlers={{
                  selectFile: crop.selectFile,
                  setIsCropping: crop.setIsCropping,
                  selectedImage: crop.selectedImage,                 
              }}/>
        </div>

        {/* 크롭 UI */}
        {crop.isCropping && (
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
        )}

        <div className={style.right}>

          {/* 년월 선택 */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={style.datePicker}>
                <DatePicker label={'연도'} views={['year']}
                  sx={{ width: '120px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'pink',
                      borderRadius: '8px'
                    }
                  }}
                  value={dayjs(year)}
                  onChange={handleYearChange}
                />
                <DatePicker label={'월'} views={['month']} format='M' 
                  sx={{ width: '120px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'pink',
                      borderRadius: '8px'
                    }
                  }}
                  value={dayjs(month)}
                  onChange={handleMonthChange}
                />
            </div>
          </LocalizationProvider>

          <div className={style.option}>
          {/* 카테고리 선택 */}
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              { category.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <div className={style.direction}>
              <label>
                <input type='radio' name='direction' value='row' checked={direction === 'row'} onChange={(e) => setDirection(e.target.value)}/>
                <span>4:3 (가로)</span>
              </label>
              <label>
                <input type='radio' name='direction' value='col' checked={direction === 'col'} onChange={(e) => setDirection(e.target.value)}/>
                <span>3:4 (세로)</span>
              </label>
            </div>
    
            <input type='text' placeholder='제목' onChange={(e) => setTitle(e.target.value)}/>

            <textarea placeholder='설명'onChange={(e) => setContent(e.target.value)}/>
          </div>


          <button type='button' className={style.saveBtn} onClick={handleUploadDiary}>저장</button>

        </div>
    </div>
  )
}
