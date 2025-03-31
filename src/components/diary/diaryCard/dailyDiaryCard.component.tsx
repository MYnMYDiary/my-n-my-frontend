'use client'

import { forwardRef } from "react";
import style from '@/styles/css/diary/diaryCard.module.css'
import { FaRegHeart } from 'react-icons/fa6';
import { useGetDiaryImage } from "@/api/queries/diary/getDiary.query";
import { useMyPageModal } from "../mypage/contexts/mypageModal.context";
import { DiaryType } from "@/interfaces/diary/list-diary.interface";

interface DailyDiaryCardProps {
  diary: DiaryType;
}

const DailyDiaryCard = forwardRef<HTMLDivElement, DailyDiaryCardProps>(({diary}, ref) => {
  
  const { openModal } = useMyPageModal();
  const {data:imageUrl} = useGetDiaryImage(diary.diary_image);
  
  const handleImageClick = () => {
    openModal(diary);
  }

  // console.log(imageUrl);
  // console.log(diary.id);
  
  return (
    <div ref={ref} className={style.cardBox_daily}>
        <img src={imageUrl} onClick={handleImageClick} />
        <h1 className={style.cardBox_title}>{diary.title}</h1>
        <div className={style.cardBoxText}>
          <div className={style.likeCount}><FaRegHeart size={20} />{diary.likecount}</div>
          <p>{diary.createdat}</p>
        </div>
    </div>
  )
})

export default DailyDiaryCard;