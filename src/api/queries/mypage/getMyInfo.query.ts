import { getMyInfo } from "@/api/apis/mypage/getMyInfo.api";
import { useQuery } from "@tanstack/react-query";

export interface MyInfo {
    createdat: string;
    email: string;
    id: number;
    nickname: string;
    profileimage: string;
    role: string;
    updatedat: string;
    market?: number;
}

export const useGetMyInfo = () => {
    return useQuery<MyInfo>({
        queryKey: ['myInfo'],
        queryFn: getMyInfo,
        staleTime: 1000 * 60 * 5, // 5분 캐싱
    });
}