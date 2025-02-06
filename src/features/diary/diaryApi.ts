import API from "@/api/interceptor/API";
import { useQuery } from "@tanstack/react-query";

// 다이어리 데이터 타입 정의
export interface Diary {
  id: number;
  title: string;
  image: string;
  content: string;
  createdAt: string;
}

// 모든 다이어리를 가져오는 API 호출 함수
const getAllDiarys = async () => {
    const { data } = await API.get("/diary");
    return data;
};

// React Query 훅
export function useGetAllDiarys (){
  return useQuery({
    queryKey: ["diarys"],
    queryFn: getAllDiarys,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};


