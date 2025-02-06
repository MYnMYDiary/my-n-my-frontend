"use client";

import { Diary, useGetAllDiarys } from "@/features/diary/diaryApi";



export default function DiaryPage() {

  const { data: diarys, isLoading, error } = useGetAllDiarys();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

    return(
      <div>
        <h2>다이어리 화면</h2>
        {diarys?.map((diary:Diary, index:number) => (
          <p key={index} >{diary.title}</p>
        ))}
      </div>
    )
  }