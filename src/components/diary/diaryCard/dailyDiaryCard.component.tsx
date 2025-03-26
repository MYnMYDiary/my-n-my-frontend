'use client'

import { forwardRef } from "react";
import style from '@/styles/css/diary/diaryCard.module.css'
import { FaRegHeart } from 'react-icons/fa6';
import { useGetDiaryImage } from "@/api/queries/diary/getDiary.query";
import { useMyPageModal } from "../mypage/contexts/mypageModal.context";

interface DailyDiaryCardProps {
  diaryId: number;
  image: string;
  title: string;
  date: string;
  likeCount: number;
}

const DailyDiaryCard = forwardRef<HTMLDivElement, DailyDiaryCardProps>(({diaryId, image, title, date, likeCount}, ref) => {
  
  const { openModal } = useMyPageModal();
  const {data:imageUrl} = useGetDiaryImage(image);
  console.log(imageUrl);
  console.log(diaryId);

  const handleImageClick = () => {
    openModal(diaryId);
  }
  
  return (
    <div ref={ref} className={style.cardBox_daily}>
        <img src={imageUrl} onClick={handleImageClick} />
        <h1 className={style.cardBox_title}>{title}</h1>
        <div className={style.cardBoxText}>
          <div className={style.likeCount}><FaRegHeart size={20} />{likeCount}</div>
          <p>{date}</p>
        </div>
    </div>
  )
})

export default DailyDiaryCard;