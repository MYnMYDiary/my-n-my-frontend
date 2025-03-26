import { getMyDiaryById } from "@/api/apis/mypage/getMyDiary.api";
import { useQuery } from "@tanstack/react-query";

export function useGetMyDiary (diaryId: number){
    return useQuery({
      queryKey: ["mydiary", diaryId],
      queryFn: () => getMyDiaryById(diaryId),
      staleTime: 1000 * 60 * 5, // 5분 캐싱
      enabled: !!diaryId,
    });
};