import { getMyInfo } from "@/api/apis/mypage/getMyInfo.api";
import { useQuery } from "@tanstack/react-query";

export const useGetMyInfo = () => {
    return useQuery({
        queryKey: ['myInfo'],
        queryFn: getMyInfo,
        staleTime: 1000 * 60 * 5, // 5분 캐싱
    });
}