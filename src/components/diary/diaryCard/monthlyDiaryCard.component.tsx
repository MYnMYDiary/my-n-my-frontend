'use client'

import { useGetDiaryImage } from '@/api/queries/diary/getDiary.query';
import style from '@/styles/css/diary/diaryCard.module.css'
import { FaRegHeart } from 'react-icons/fa6';
import { forwardRef } from 'react';

interface MonthlyDiaryCardProps {
  image: string;
  title: string;
  date: string;
  likeCount: number;
}

const MonthlyDiaryCard = forwardRef<HTMLDivElement, MonthlyDiaryCardProps>(
  function MonthlyDiaryCard({image, title, date, likeCount}, ref) {

  const {data:imageUrl} = useGetDiaryImage(image);
  console.log(imageUrl);

  return (
    <div ref={ref} className={style.cardBox}>
        <img src={imageUrl} />
        <h1>{title}</h1>
        <div className={style.cardBoxText}>
          <div className={style.likeCount}><FaRegHeart size={20} />{likeCount}</div>
          <p>{date}</p>
        </div>
    </div>
  )
}
)

export default MonthlyDiaryCard;