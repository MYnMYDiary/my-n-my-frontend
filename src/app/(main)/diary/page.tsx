"use client";

import { DiaryType } from "@/api/apis/diary/getDiary.api";
import { useGetAllDiarys } from "@/api/queries/diary/getDiary.query";




export default function DiaryPage() {

  const { data: diarys, isLoading, error } = useGetAllDiarys();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

    return(
      <div>
        <h2>다이어리 화면</h2>
        {diarys?.map((diary:DiaryType, index:number) => (
          <p key={index} >{diary.title}</p>
        ))}
      </div>
    )
  }