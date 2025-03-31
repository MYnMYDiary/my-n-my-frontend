import { getMyDiaryById } from "@/api/apis/mypage/getMyDiary.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetMyDiary (diaryId: number, category: string, year: string, month: string){
    return useQuery({
      queryKey: ["mydiary", diaryId, category, year, month],
      queryFn: () => getMyDiaryById(diaryId, category, year, month),
      staleTime: 1000 * 60 * 5, // 5분 캐싱
      enabled: !!diaryId,
    });
};