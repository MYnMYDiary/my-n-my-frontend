'use client'

import { getAllDiarys, getDiaryByUser, getDiaryImage } from "@/api/apis/diary/getDiary.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// React Query 훅
export function useGetAllDiarys (){
    return useQuery({
      queryKey: ["diarys"],
      queryFn: getAllDiarys,
      staleTime: 1000 * 60 * 5, // 5분 캐싱
    });
};


export function useGetMyDiary(category: string) {
  const { data, mutate} = useMutation({
    mutationFn: getDiaryByUser,
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    mutate(category);
  }, [category, mutate]);

  return { data };
}

export const useGetDiaryImage = (image: string) => {
  return useQuery({
    queryKey: ['diaryImage', image],
    queryFn: () => getDiaryImage(image),
    enabled: !!image,
  });
};