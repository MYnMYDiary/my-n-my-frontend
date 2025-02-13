'use client'

import style from '@styles/css/mypage/mypage.module.css'
import MonthlyDiaryCard from '../diaryCard/monthlyDiaryCard.component'
import { useState } from 'react'
import WeeklyDiaryCard from '../diaryCard/weeklyDiaryCard.component'
import DailyDiaryCard from '../diaryCard/dailyDiaryCard.component'
import CopyNoteCard from '../diaryCard/copynoteCard.component'
import StudyPlannerCard from '../diaryCard/studyplannerCard.component'
import { useGetMyDiary, useGetDiaryImage } from '@/api/queries/diary/getDiary.query'

const categories = [
  { id: '001', name: 'Monthly'},
  { id: '002', name: 'Weekly'},
  { id: '003', name: 'Daily'},
  { id: '004', name: 'Copy Notes'},
  { id: '005', name: 'Study Planer'},
]

interface DiaryType{
  space: string,
  category: string,
  id: number,
  title: string,
  likecount: number,
  diary_image: string,
  createdat: string
}


export default function MyDiary() {

  const [selectedCategory, setSelectedCategory] = useState<string>('001');

  const {data:diaries} = useGetMyDiary(selectedCategory);


  console.log(diaries);

  return (
    <div className={style.diaryFrame}>

        <div className={style.categoryBox}>
          {categories.map(c => 
            <div 
              key={c.id}
              className={`${style.category} ${selectedCategory === c.id ? style.selected : ''}`}
              onClick={() => setSelectedCategory(c.id)}
            >
              {c.name}
            </div>
          )}
        </div>

        <div className={style.diaryBox}>
        {selectedCategory === '001' && diaries?.map((diary:DiaryType) => (
          <MonthlyDiaryCard 
            key={diary.id}
            image={diary.diary_image}
            title={diary.title}
            date={diary.createdat}
            likeCount={diary.likecount}
          />
        ))}
          {selectedCategory == '002' && <WeeklyDiaryCard/>}
          {selectedCategory == '003' && <DailyDiaryCard/>}
          {selectedCategory == '004' && <CopyNoteCard/>}
          {selectedCategory == '005' && <StudyPlannerCard/>}           
        </div>

    </div>
  )
}
