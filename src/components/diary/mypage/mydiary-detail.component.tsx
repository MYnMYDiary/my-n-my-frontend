'use client'

import style from '@styles/css/diary/detailDiary.module.css'
import { useState, useEffect } from 'react';
import { useMyPageModal } from '@/components/diary/mypage/contexts/mypageModal.context';
import { useGetMyDiary } from '@/api/queries/mypage/getMyDiary.query';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useGetDiaryImage } from '@/api/queries/diary/getDiary.query';
import { FaRegHeart } from 'react-icons/fa6';



export default function MyDiaryDetail() {

    const { isOpen, selectedDiary, closeModal } = useMyPageModal();
    const { data: diary } = useGetMyDiary(selectedDiary);
    const {data:imageUrl} = useGetDiaryImage(diary?.diary_image);
    console.log('선택한 다이어리 아이디: ',selectedDiary);
    console.log('다이어리 데이터: ',diary);

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
      {isOpen && diary && (
        <div className={style.background}>
          <div className={style.modal}>
            <div className={style.modalHeader}>
              <p>마이페이지 {'>'} {diary.category}</p>
              <IoCloseCircleOutline size={25} onClick={closeModal}/>
            </div>
            <div className={style.modalContent}>
              <img src={imageUrl} alt="diary_image" />
              <div className={style.diaryInfo}>
                <div className={style.diaryTextBox}>
                  <h3>{diary.title}</h3>
                  <pre>{diary.content}</pre>
                  <div className={style.likeCount}><FaRegHeart size={20} />{diary.likecount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
