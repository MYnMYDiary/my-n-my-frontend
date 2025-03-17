'use client'

import style from '@styles/css/mypage/mypage.module.css'
import MonthlyDiaryCard from '../diaryCard/monthlyDiaryCard.component'
import { useEffect, useState } from 'react'
import WeeklyDiaryCard from '../diaryCard/weeklyDiaryCard.component'
import DailyDiaryCard from '../diaryCard/dailyDiaryCard.component'
import CopyNoteCard from '../diaryCard/copynoteCard.component'
import StudyPlannerCard from '../diaryCard/studyplannerCard.component'
import { useGetMyDiary} from '@/api/queries/diary/getDiary.query'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import API from '@/api/interceptor/API'
import { useInfiniteQuery } from '@tanstack/react-query'

const categories = [
  { id: '001', name: 'Monthly'},
  { id: '002', name: 'Weekly'},
  { id: '003', name: 'Daily'},
  { id: '004', name: 'Copy Notes'},
  { id: '005', name: 'Study Planer'},
]

export interface DiaryType{
  space: string,
  category: string,
  id: number,
  title: string,
  likecount: number,
  diary_image: string,
  createdat: string
}



export default function MyDiary() {

  const [selectedCategory, setSelectedCategory] = useState<string>('001'); //카테고리 선택(초기값: Monthly)
  const {data:initDiaries} = useGetMyDiary(selectedCategory); //처음 5개의 데이터
  const { ref, inView } = useInView(); //무한 스크롤 처리

  const { data: 
    allDiaries,         // 모든 페이지의 데이터를 포함하는 객체
    fetchNextPage,      // 다음 페이지를 불러오는 함수
    hasNextPage,        // 다음 페이지 존재 여부 (boolean)
    isFetchingNextPage  // 현재 다음 페이지 로딩 중인지 여부
  } = useInfiniteQuery({
    // 캐시 키 (카테고리가 변경되면 새로운 쿼리 시작)
    queryKey: ['diaries', selectedCategory],
    // 데이터를 가져오는 함수
    queryFn: async ({ pageParam = null }) => {
    // pageParam이 없으면(첫 페이지) 초기 URL 사용
    // pageParam이 있으면(다음 페이지) 해당 URL 사용
      const url = pageParam || `/diary/mydiary?category=${selectedCategory}`;
      const response = await API.post(url, { category: selectedCategory });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.next || undefined,
    initialPageParam: null
  });
  
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);


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
          {selectedCategory === '001' && 
            allDiaries?.pages.map((page) =>
              page.data.map((diary: DiaryType, index: number) => (
                <MonthlyDiaryCard 
                  ref={index === page.data.length - 1 ? ref : undefined}
                  key={diary.id}
                  image={diary.diary_image}
                  title={diary.title}
                  date={diary.createdat}
                  likeCount={diary.likecount}
                />
              ))
            )
          }
          {selectedCategory == '002' && <WeeklyDiaryCard/>}
          {selectedCategory == '003' && <DailyDiaryCard/>}
          {selectedCategory == '004' && <CopyNoteCard/>}
          {selectedCategory == '005' && <StudyPlannerCard/>}           
        </div>

    </div>
  )
}
