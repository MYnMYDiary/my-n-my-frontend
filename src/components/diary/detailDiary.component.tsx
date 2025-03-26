'use client'

import style from '@styles/css/diary/detailDiary.module.css'
import { useState, useEffect } from 'react';
import { useMyPageModal } from '@/components/diary/mypage/contexts/mypageModal.context';
export default function DetailDiary() {

    const { isOpen, selectedDiary, closeModal } = useMyPageModal();


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
      {isOpen && (
        <div className={style.background}>
          <div className={style.modal}>
            <div className={style.modalContent}>
                <div className={style.modalHeader}>
                    <h1>Detail Diary</h1>
                    <button onClick={closeModal}>X</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
