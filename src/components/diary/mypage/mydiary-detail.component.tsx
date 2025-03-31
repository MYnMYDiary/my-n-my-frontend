'use client'

import style from '@styles/css/diary/detailDiary.module.css'
import { useState, useEffect } from 'react';
import { useMyPageModal } from '@/components/diary/mypage/contexts/mypageModal.context';
import { useGetMyDiary } from '@/api/queries/mypage/getMyDiary.query';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useGetDiaryImage } from '@/api/queries/diary/getDiary.query';
import { FaRegHeart } from 'react-icons/fa6';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";



export default function MyDiaryDetail() {

    const { isOpen, closeModal } = useMyPageModal();
    const {selectedDiary, selectedCategory, selectedYear, selectedMonth} = useMyPageModal();
    const [currentDiaryId, setCurrentDiaryId] = useState(selectedDiary);

    useEffect(() => {
      setCurrentDiaryId(selectedDiary);
  }, [selectedDiary]);

  

    const { data: diary } = useGetMyDiary(currentDiaryId, selectedCategory ?? '', selectedYear ?? '', selectedMonth ?? '');
    const {data:imageUrl} = useGetDiaryImage(diary?.data?.diary_image);

    console.log('현재 다이어리 아이디: ',currentDiaryId);
    console.log('선택한 다이어리 아이디: ',selectedDiary);
    console.log('다이어리 데이터: ',diary);
    console.log('이전 다이어리: ', diary?.prev);
    console.log('다음 다이어리: ', diary?.next);

    const handleNextDiary = () => {
      if (diary?.next) {
          setCurrentDiaryId(diary.next);
      }
  };

  const handlePrevDiary = () => {
    if (diary?.prev) {
        setCurrentDiaryId(diary.prev);
    }
};

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // 컴포넌트가 언마운트될 때 스크롤을 다시 활성화
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    

  return (
    <>
      {isOpen && diary?.data && (
        <div className={style.background}>
          <div className={style.modal}>
            <div className={style.modalHeader}>
              <p>마이페이지 {'>'} {diary.data.category}</p>
              <IoCloseCircleOutline size={25} onClick={closeModal}/>
            </div>
            <div className={style.modalContent}>
              <div className={style.imageBox}>
                {diary.prev && <SlArrowLeft size={35} onClick={handlePrevDiary}/>}
                <img src={imageUrl} alt="diary_image" />
                {diary.next && <SlArrowRight size={35} onClick={handleNextDiary}/>}
              </div>
              <div className={style.diaryInfo}>
                <div className={style.diaryTextBox}>
                    <h3>{diary.data.title}</h3>
                  <pre>{diary.data.content}</pre>
                  <div className={style.likeCount}><FaRegHeart size={20} />{diary.data.likecount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
