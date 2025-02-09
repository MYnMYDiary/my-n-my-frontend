'use client'

import { getAllDiarys } from "@/api/apis/diary/getDiary.api";
import { useQuery } from "@tanstack/react-query";

// React Query 훅
export function useGetAllDiarys (){
    return useQuery({
      queryKey: ["diarys"],
      queryFn: getAllDiarys,
      staleTime: 1000 * 60 * 5, // 5분 캐싱
    });
  };