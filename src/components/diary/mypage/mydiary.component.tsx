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
import MyDiaryHeader from './mydiary-header.component'
import { useMyDiaryCategory } from './contexts/mydiaryCategory.context'


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

  const { selectedCategory } = useMyDiaryCategory(); // 카테고리 선택
  const { selectedYear, selectedMonth } = useMyDiaryCategory(); // 연도, 월 선택
  const { ref, inView } = useInView(); //무한 스크롤 처리

  const { data: 
    allDiaries,         // 모든 페이지의 데이터를 포함하는 객체
    fetchNextPage,      // 다음 페이지를 불러오는 함수
    hasNextPage,        // 다음 페이지 존재 여부 (boolean)
    isFetchingNextPage,  // 현재 다음 페이지 로딩 중인지 여부
    refetch
  } = useInfiniteQuery({
    // 캐시 키 (카테고리가 변경되면 새로운 쿼리 시작)
    queryKey: ['diaries', selectedCategory],
    // 데이터를 가져오는 함수
    queryFn: async ({ pageParam = null }) => {
    // pageParam이 없으면(첫 페이지) 초기 URL 사용
    // pageParam이 있으면(다음 페이지) 해당 URL 사용
      const url = pageParam || `/diary/mydiary?category=${selectedCategory}`;
      const response = await API.post(url, { 
        categoryId: selectedCategory,
        year: selectedYear,
        month: selectedMonth
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.next || undefined,
    initialPageParam: null
  });
  
  // 다음 페이지가 존재할 때 무한 스크롤 처리
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  // 카테고리 변경 시 데이터 리셋을 위한 useEffect
  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedYear, selectedMonth, refetch]);



  // 로그 확인
  console.log('선택한 카테고리: ',selectedCategory);
  console.log('선택한 연도: ',selectedYear);
  console.log('선택한 월: ',selectedMonth);
  console.log('모든 다이어리: ', allDiaries?.pages[0].data);

  return (
    <div className={style.diaryFrame}>

      {/* 헤더 */}
      <MyDiaryHeader/>

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

          {selectedCategory == '003' &&
            allDiaries?.pages.map((page) => {
              // 현재 페이지의 데이터를 3개씩 그룹화
              const rows = [];
              for (let i = 0; i < page.data.length; i += 3) {
                rows.push(page.data.slice(i, i + 3));
              }
              
              return rows.map((row, rowIndex) => (
                <div key={rowIndex} className={style.dailyCardWrapper}>
                  {row.map((diary: DiaryType, index: number) => (
                    <DailyDiaryCard
                      ref={rowIndex === rows.length - 1 && index === row.length - 1 ? ref : undefined}
                      key={diary.id}
                      diaryId={diary.id}
                      image={diary.diary_image}
                      title={diary.title}
                      date={diary.createdat}
                      likeCount={diary.likecount}
                    />
                  ))}
                </div>
              ));
            })
          }
          {selectedCategory == '004' && <CopyNoteCard/>}
          {selectedCategory == '005' && <StudyPlannerCard/>}           
        </div>

    </div>
  )
}
