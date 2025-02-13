'use client'

import { useGetDiaryImage } from '@/api/queries/diary/getDiary.query';
import style from '@/styles/css/diary/diaryCard.module.css'
import { FaRegHeart } from 'react-icons/fa6';

interface MonthlyDiaryCardProps {
  image: string;
  title: string;
  date: string;
  likeCount: number;
}

export default function MonthlyDiaryCard({image, title, date, likeCount}: MonthlyDiaryCardProps) {

  const {data:imageUrl} = useGetDiaryImage(image);
  console.log(imageUrl);

  return (
    <div className={style.cardBox}>
        <img src={imageUrl} />
        <h1>{title}</h1>
        <div className={style.cardBoxText}>
          <div className={style.likeCount}><FaRegHeart size={20} />{likeCount}</div>
          <p>{date}</p>
        </div>
    </div>
  )
}
